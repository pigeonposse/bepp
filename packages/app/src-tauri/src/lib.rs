#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
	// use tauri::Manager;
    tauri::Builder::default()
		.plugin(tauri_plugin_log::Builder::new().targets([
			tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Stdout),
			tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::LogDir { file_name: None }),
			tauri_plugin_log::Target::new(tauri_plugin_log::TargetKind::Webview),
		]).build())
		.plugin(tauri_plugin_shell::init())
		.plugin(tauri_plugin_http::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_fs::init())
		.plugin(tauri_plugin_dialog::init())
		.plugin(tauri_plugin_autostart::init(tauri_plugin_autostart::MacosLauncher::LaunchAgent, Some(vec!["--flag1", "--flag2"])))
        .setup(|app| {

			// #[cfg(debug_assertions)] // only include this code on debug builds
			// {
			// 	app.get_webview_window("main").unwrap().open_devtools();
			// }
			
            #[cfg(desktop)]
            app.handle().plugin(tauri_plugin_updater::Builder::new().build())?;

            Ok(())

        })
        // .invoke_handler(tauri::generate_handler![server::start_server])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
