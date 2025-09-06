


<pre><code class="language-rust">
extern crate config;
use std::collections::HashMap;
use std::collections::BTreeMap;
fn main() {
    // Запуск с переменной среды APP_DEBUG переопределит вариант файла Settings.toml
    // APP_DEBUG=1 cargo run --bin=simple

    let mut settings:config::Config = config::Config::default();
    settings
        .merge(config::File::with_name("Settings")).unwrap()
        .merge(config::Environment::with_prefix("APP")).unwrap();

    // Print out our settings (as a HashMap)
    // println!("{:?}",settings.try_into::<HashMap<String, String>>().unwrap());
       println!("{:?}",settings.try_into::<BTreeMap<String, String>>().unwrap());
}
</code></pre>
