
mod server;
use tauri_plugin_autostart::MacosLauncher;
// use tauri_plugin_log::{Target, TargetKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
		// .plugin(tauri_plugin_log::Builder::new().targets([
		// 	Target::new(TargetKind::Stdout),
		// 	Target::new(TargetKind::LogDir { file_name: None }),
		// 	Target::new(TargetKind::Webview),
		// ]).build())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_http::init())
		.plugin(tauri_plugin_dialog::init())
		.plugin(tauri_plugin_shell::init())
		.plugin(tauri_plugin_autostart::init(MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"])))
        .setup(|app| {

            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;
            Ok(())
        })
        // .plugin(tauri_plugin_window::init())
        .invoke_handler(tauri::generate_handler![server::start_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
