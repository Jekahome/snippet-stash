

File Cargo.toml:
```toml
dotenv = "0.15"
config = "0.14"
once_cell = "1.10"
serde = { version = "1.0", features = ["derive"] }
```

File .dev.env:
```
RUST_LOG=trace #debug
NO_COLOR=1 # Do not output ANSI escape codes
APP_CLIENT_AI_MOCK=true
```

File config/dev.toml
```toml
[open_ai]
key="mock"
model="davinci-002"
```

File settings.rs:
```
use config::{Config, Environment};
use serde::Deserialize;
use once_cell::sync::Lazy;
use std::env;
#[derive(Debug, Deserialize)]
pub struct SettingsClientOpenAI {
    pub model: String,
    pub key: String,
}
#[derive(Debug, Deserialize)]
pub struct Settings {
    client_ai_mock: bool,
    open_ai: SettingsClientOpenAI,
}
static CONFIG: Lazy<Settings> = Lazy::new(|| {
    Settings::new().unwrap()
});
impl Settings {
    pub fn global_init(){
        let _ = &*CONFIG;
    }
    fn new() -> Result<Self, config::ConfigError> {
        dotenv::from_filename(".dev.env").ok();
        if env::var("RUST_LOG").is_err() {
            env::set_var("RUST_LOG", "debug");
        }
        if env::var("NO_COLOR").is_err() {
            env::set_var("NO_COLOR", "1");
        }
        if env::var("APP_CLIENT_AI_MOCK").is_err() {
            env::set_var("APP_CLIENT_AI_MOCK", "1");
        }
        let run_mode = env::var("RUN_MODE").unwrap_or_else(|_| "dev".into());
        let conf = Config::builder()
        .add_source(config::File::with_name(&format!("config/{}",run_mode)).required(true))
        // Eg.. `APP_DEBUG=1 ./target/app` would set the `debug` key
        .add_source(Environment::with_prefix("app").list_separator("_"))
        .build()?;
        conf.try_deserialize()
    }
    pub fn get_settings_ai_client<'a>() -> &'a SettingsClientOpenAI{
        &CONFIG.open_ai
    }
    pub fn is_mock_client_ai() -> bool{
        CONFIG.client_ai_mock
    }
}
```
