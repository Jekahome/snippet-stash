

File Settings.toml:
```
debug = false
priority = 32
key = "189rjfadoisfj8923fjio"

```

File simple.rs:
<pre><code class="language-rust">
extern crate config;

use std::collections::HashMap;
use std::collections::BTreeMap;
fn main() {
    // Запуск с переменной среды APP_DEBUG переопределит вант файла Settings.toml
    // APP_DEBUG=1 cargo run --bin=simple

    let mut settings:config::Config = config::Config::default();
    settings
        // Add in `./Settings.toml`
        .merge(config::File::with_name("Settings")).unwrap()
        // Add in settings from the environment (with a prefix of APP) Eg.. `APP_DEBUG=1 ./target/app` would set the `debug` key
        .merge(config::Environment::with_prefix("APP")).unwrap();

   // println!("{:?}",settings.try_into::<HashMap<String, String>>().unwrap());
      println!("{:?}",settings.try_into::<BTreeMap<String, String>>().unwrap());
}
</code></pre>

Запуск:
```
$ cargo run --bin=simple

OUTPUT: {"debug": "false", "key": "189rjfadoisfj8923fjio", "priority": "32"}

APP_DEBUG=1 cargo run --bin=simple
OUTPUT: {"debug": "1", "key": "189rjfadoisfj8923fjio", "priority": "32"}
```

