mod mcp;
mod session;

use session::AppState;
use std::sync::Arc;
use tauri::Manager;
use serde_json::Value;

#[tauri::command]
async fn submit_mcp_response(id: String, result: Value, state: tauri::State<'_, Arc<AppState>>) -> Result<(), String> {
    let mut requests = state.pending_requests.lock().unwrap();
    if let Some(sender) = requests.remove(&id) {
        let _ = sender.send(result);
        Ok(())
    } else {
        Err("Request ID not found".to_string())
    }
}

#[tauri::command]
async fn get_current_question(state: tauri::State<'_, Arc<AppState>>) -> Result<Value, String> {
    // Force reload from disk to ensure we get latest
    // Determine if we should propagate the error or just log it?
    // If we can't load the session, we definitely can't return the question.
    state.load_session()?; 
    state.get_current_question()
}

#[tauri::command]
async fn next_question(state: tauri::State<'_, Arc<AppState>>) -> Result<Value, String> {
    state.advance_session()
}

#[tauri::command]
async fn previous_question(state: tauri::State<'_, Arc<AppState>>) -> Result<Value, String> {
    state.previous_session()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .setup(|app| {
      let state = Arc::new(AppState::new(app.handle().clone()));
      app.manage(state.clone());

      // Spawn MCP Loop
      tauri::async_runtime::spawn(async move {
        mcp::run_mcp_loop(state).await;
      });

      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![submit_mcp_response, get_current_question, next_question, previous_question])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
