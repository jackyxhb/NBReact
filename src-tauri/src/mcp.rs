use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use tokio::io::{self, AsyncBufReadExt, BufReader};
use std::sync::Arc;
use crate::session::AppState;
use tauri::Emitter; // For emit
use tokio::sync::oneshot;

#[derive(Serialize, Deserialize, Debug)]
struct JsonRpcRequest {
    jsonrpc: String,
    method: String,
    params: Option<Value>,
    id: Option<Value>,
}

#[derive(Serialize, Deserialize, Debug)]
struct JsonRpcResponse {
    jsonrpc: String,
    result: Option<Value>,
    error: Option<Value>,
    id: Option<Value>,
}

pub async fn run_mcp_loop(state: Arc<AppState>) {
    let stdin = io::stdin();
    let reader = BufReader::new(stdin);
    let mut lines = reader.lines();

    eprintln!("[MCP] Server started, listening on stdio...");

    while let Ok(Some(line)) = lines.next_line().await {
        if line.trim().is_empty() {
            continue;
        }

        let request_str = line.trim();

        if let Ok(request) = serde_json::from_str::<JsonRpcRequest>(request_str) {
            let response = handle_request(&request, &state).await;
            let response_str = serde_json::to_string(&response).unwrap();
            println!("{}", response_str);
        } else {
            eprintln!("[MCP] Failed to parse request");
        }
    }
}

async fn call_frontend(method: &str, params: Option<Value>, state: &Arc<AppState>) -> Result<Value, String> {
    let (tx, rx) = oneshot::channel();
    let request_id = uuid::Uuid::new_v4().to_string();

    {
        let mut requests = state.pending_requests.lock().unwrap();
        requests.insert(request_id.clone(), tx);
    }

    state.app_handle.emit("mcp-request", json!({
        "id": request_id,
        "method": method,
        "params": params
    })).map_err(|e| e.to_string())?;

    // Wait for response
    rx.await.map_err(|_| "Frontend disconnected".to_string())
}

async fn handle_request(req: &JsonRpcRequest, state: &Arc<AppState>) -> JsonRpcResponse {
    let result = match req.method.as_str() {
        "initialize" => json!({
            "protocolVersion": "2024-11-05",
            "capabilities": {
                "tools": {
                    "listChanged": true
                }
            },
            "serverInfo": {
                "name": "nbreact-tauri",
                "version": "1.0.0"
            }
        }),
        "tools/list" => json!({
            "tools": [
                {
                    "name": "notebook_start",
                    "description": "Start a new practice session",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "topic": { "type": "string" },
                            "difficulty": { "type": "string" }
                        }
                    }
                },
                {
                    "name": "notebook_evaluate",
                    "description": "Evaluate user code",
                    "inputSchema": {
                        "type": "object",
                        "properties": {
                            "code": { "type": "string" }
                        }
                    }
                }
            ]
        }),
        "notifications/initialized" => json!(null),
        "ping" => json!({}),
        "tools/call" => {
            // MCP tools/call structure: params: { name: "toolname", arguments: { ... } }
            if let Some(params) = &req.params {
                let name = params.get("name").and_then(|v| v.as_str()).unwrap_or("");
                let args = params.get("arguments").cloned();
                
                match name {
                    "notebook_evaluate" | "notebook_start" => {
                        match call_frontend(name, args, state).await {
                            Ok(res) => json!({ "content": [{ "type": "text", "text": res.to_string() }] }),
                            Err(e) => json!({ "error": e, "isError": true })
                        }
                    },
                    _ => json!({ "error": "Unknown tool" })
                }
            } else {
                 json!({ "error": "Missing params" })
            }
        },
        _ => json!({ "error": "Method not found" })
    };

    JsonRpcResponse {
        jsonrpc: "2.0".to_string(),
        result: Some(result),
        error: None,
        id: req.id.clone(),
    }
}
