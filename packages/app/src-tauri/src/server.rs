use tauri::{AppHandle};
use tauri_plugin_shell::ShellExt;
// use std::net::TcpStream;

#[tauri::command]
pub async fn start_server(app: AppHandle, port: u16) -> Result<u16, String> {

    let command_path = "bepp-server";
    let args = vec![format!("--port={}", port)];

    let sidecar_command = app.shell()
        .sidecar(command_path)
        .map_err(|e| format!("Failed to create sidecar: {:?}", e))?;

    let sidecar_command = sidecar_command.args(&args);
    
    let (mut _rx, mut _child) = sidecar_command
        .spawn()
        .map_err(|e| format!("Failed to spawn sidecar: {:?}", e))?;
    
    Ok(port)
}

// pub async fn start_server(app: AppHandle) -> Result<u16, String> {
//     let mut port = 13129; 
//     let max_attempts = 10;

//     for _ in 0..max_attempts {
//         if is_port_available(port) {

// 			let command_path = "bepp-server";
//             let args = vec![format!("--port={}", port)];

//             let sidecar_command = app.shell()
//                 .sidecar(command_path)
//                 .map_err(|e| format!("Failed to create sidecar: {:?}", e))?;

//             let sidecar_command = sidecar_command.args(&args);
            
            
//             let (mut _rx, mut _child) = sidecar_command
//                 .spawn()
//                 .map_err(|e| format!("Failed to spawn sidecar: {:?}", e))?;
            
//             return Ok(port); 
//         }
//         port += 1; 
//     }

//     Err("No available ports found".into()) 
// }


// fn is_port_available(port: u16) -> bool {
//     TcpStream::connect(format!("127.0.0.1:{}", port)).is_err()
// }

// use tauri::{AppHandle};
// use tauri_plugin_shell::ShellExt;

// #[tauri::command]
// pub async fn start_server(app: AppHandle) -> Result<(), String> {
//     let sidecar_command = app.shell()
//         .sidecar("bepp-server --port=13129")
//         .map_err(|e| format!("Failed to create bepp-server: {:?}", e))?;

//     let (mut _rx, mut _child) = sidecar_command
//         .spawn()
//         .map_err(|e| format!("Failed to spawn bepp-server: {:?}", e))?;

//     Ok(())
// }
