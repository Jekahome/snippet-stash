


File lib.rs: 
```
pub mod settings{
    use config::{Config};
    use std::sync::RwLock;
    use lazy_static::lazy_static;

    lazy_static! {
        static ref SETTINGS: RwLock<Config> = {
        let mut settings: Config = Config::default();
            settings
            .merge(config::File::with_name("src/settings/settings.toml")).unwrap()
            .merge(config::Environment::with_prefix("APP")).unwrap();
            RwLock::new(settings)
        };
    }
   pub fn config() -> Result<String, Box<std::error::Error>>{
        let config = format!("host={host} user={user} port={port} password={password} dbname={dbname}",
        host=SETTINGS.read()?.get::<String>("host")?,
        user=SETTINGS.read()?.get::<String>("user")?,
        port=SETTINGS.read()?.get::<i32>("port")?,
        password=SETTINGS.read()?.get::<String>("password")?,
        dbname=SETTINGS.read()?.get::<String>("dbname")?);

        Ok(config)
   } 
}
```

File settings/settings.toml:
```toml
host="localhost" 
user="rust" 
port=5432 
password='job_queue' 
dbname="rust"
```

Used File main.rs:
```
use tokio_postgres_example::settings;

#[tokio::main] 
async fn main() -> std::result::Result<(), tokio_postgres::Error> { 

    let config = settings::config().expect("Error parse config");
    let (mut client, connection):(Client,Connection<_,_>) =
        tokio_postgres::connect(&config, NoTls).await?;
...
}
```
