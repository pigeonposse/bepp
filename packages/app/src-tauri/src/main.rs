// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    // https://beta.tauri.app/guides/upgrade-migrate/from-tauri-1/#tauri-configuration
    bepp_lib::run()
}
