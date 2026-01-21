use serde::{Deserialize, Serialize};
use std::fs;
use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex};
use tauri::AppHandle;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Question {
    pub id: String,
    pub title: String,
    pub description: String,
    pub requirements: Vec<String>,
    pub examples: String,
    pub starter_code: String,
    pub difficulty: String,
    pub topic: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Session {
    pub session_id: String,
    pub topic: String,
    pub difficulty: String,
    pub questions_per_session: usize,
    pub current_question_index: usize,
    pub questions: Vec<Question>,
    pub start_time: String,
    pub scores: Vec<f32>,
}

use std::collections::HashMap;
use serde_json::Value;
use tokio::sync::oneshot;

pub struct AppState {
    pub session: Arc<Mutex<Option<Session>>>,
    pub app_handle: AppHandle,
    pub pending_requests: Arc<Mutex<HashMap<String, oneshot::Sender<Value>>>>,
}

impl AppState {
    pub fn new(app_handle: AppHandle) -> Self {
        Self {
            session: Arc::new(Mutex::new(None)),
            app_handle,
            pending_requests: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub fn load_session(&self) -> Result<Session, String> {
        // Use absolute path for reliability in this specific environment
        let session_path = PathBuf::from("/Users/macbook1/work/NBReact/practice/current/session.json");
        
        if !session_path.exists() {
            // Log for debugging
            println!("Session file not found at: {:?}", session_path);
            return Err(format!("Session file not found at: {:?}", session_path));
        }

        let content = fs::read_to_string(&session_path)
            .map_err(|e| format!("Failed to read session file at {:?}: {}", session_path, e))?;
            
        let session: Session = serde_json::from_str(&content)
            .map_err(|e| format!("Failed to parse session JSON: {}", e))?;

        let mut session_lock = self.session.lock().unwrap();
        *session_lock = Some(session.clone());
        
        Ok(session)
    }

    pub fn get_current_question(&self) -> Result<serde_json::Value, String> {
        let session_lock = self.session.lock().unwrap();
        
        if let Some(session) = &*session_lock {
            if let Some(question) = session.questions.get(session.current_question_index) {
                 return Ok(serde_json::to_value(question).unwrap());
            } else if let Some(last) = session.questions.last() {
                 return Ok(serde_json::to_value(last).unwrap()); 
            }
        }
        Err("No active session or question".to_string())
    }

    pub fn advance_session(&self) -> Result<serde_json::Value, String> {
        // Use absolute path for reliability
        let session_path = PathBuf::from("/Users/macbook1/work/NBReact/practice/current/session.json");
        
        let mut session_lock = self.session.lock().unwrap();
        
        if let Some(session) = &mut *session_lock {
            // Increment index if possible
            if session.current_question_index + 1 < session.questions.len() {
                session.current_question_index += 1;
                
                // Save to disk
                let json = serde_json::to_string_pretty(session)
                    .map_err(|e| format!("Failed to serialize session: {}", e))?;
                    
                fs::write(&session_path, json)
                    .map_err(|e| format!("Failed to save session: {}", e))?;
                
                // Return new question
                if let Some(question) = session.questions.get(session.current_question_index) {
                     return Ok(serde_json::to_value(question).unwrap());
                }
            } else {
                 return Err("No more questions in session".to_string());
            }
        }
        Err("No active session".to_string())
    }

    pub fn previous_session(&self) -> Result<serde_json::Value, String> {
        let session_path = PathBuf::from("/Users/macbook1/work/NBReact/practice/current/session.json");
        let mut session_lock = self.session.lock().unwrap();

        if let Some(session) = &mut *session_lock {
            if session.current_question_index > 0 {
                session.current_question_index -= 1;
                
                let json = serde_json::to_string_pretty(session)
                    .map_err(|e| format!("Failed to serialize session: {}", e))?;
                fs::write(&session_path, json)
                    .map_err(|e| format!("Failed to save session: {}", e))?;

                if let Some(question) = session.questions.get(session.current_question_index) {
                     return Ok(serde_json::to_value(question).unwrap());
                }
            } else {
                return Err("Already at first question".to_string());
            }
        }
        Err("No active session".to_string())
    }
}
