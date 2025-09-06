


<pre><code class="language-rust">
#[macro_use]
extern crate lazy_static;
extern crate config;
use std::error::Error;
use std::sync::RwLock;
use config::Config;
use std::collections::btree_map::BTreeMap;

// Глобальный конфиг с изначальной загрузкой и последующем изменении на уровня умного счетчика ссылок !!!!
/*lazy_static! {
        static ref SETTINGS: RwLock<Config> = RwLock::new(Config::default());
}*/
lazy_static! {
        static ref SETTINGS: RwLock<Config> = {
           let mut settings: Config = Config::default();
            settings
             .merge(config::File::with_name("Settings")).unwrap()
             .merge(config::Environment::with_prefix("APP")).unwrap();
            RwLock::new(settings)
        };
}

//  APP_DEBUG=1  APP_KEY=mykey cargo run --bin=global
fn try_main() -> Result<(), Box<Error>> {
    // Set property
    SETTINGS.write()?.set("property", 42)?;

    // Get property
    println!("property: {}", SETTINGS.read()?.get::<i32>("property")?);

    println!("debug: {}", SETTINGS.read()?.get::<i32>("debug")?);
    println!("priority: {}", SETTINGS.read()?.get::<i32>("priority")?);
    println!("priority: {}", SETTINGS.read()?.get_int("priority")?);

    println!("key: {}", SETTINGS.read()?.get::<String>("key")?);
    println!("key: {}", SETTINGS.read()?.get_str("key")?);
    Ok(())
}
fn main() {
    try_main().unwrap()
}
</code></pre>

