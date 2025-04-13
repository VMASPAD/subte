// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use reqwest::blocking::Client;
use scraper::{Html, Selector};

#[tauri::command]
fn get_htmlsubte(url: &str, element_id: &str) -> Result<String, String> {
    // Crear un cliente HTTP
    let client = Client::new();
    
    // Hacer la solicitud HTTP
    let response = match client.get(url).send() {
        Ok(resp) => resp,
        Err(e) => return Err(format!("Error al hacer la solicitud: {}", e)),
    };
    
    // Verificar si la solicitud fue exitosa
    if !response.status().is_success() {
        return Err(format!("La solicitud falló con código: {}", response.status()));
    }
    
    // Obtener el contenido HTML
    let html_content = match response.text() {
        Ok(content) => content,
        Err(e) => return Err(format!("Error al leer el contenido: {}", e)),
    };
    
    // Parsear el HTML
    let document = Html::parse_document(&html_content);
    
    // Crear un selector para el ID específico
    let selector = match Selector::parse(&format!("#{}", element_id)) {
        Ok(s) => s,
        Err(_) => return Err("Error al crear el selector".to_string()),
    };
    
    // Buscar el elemento por ID
    match document.select(&selector).next() {
        Some(element) => Ok(element.html()),
        None => Err(format!("No se encontró ningún elemento con ID: {}", element_id)),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![get_htmlsubte])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
