

lazy_static, once_cell для однократной инициализации данных

Ленивые инициализированные глобальные данные
```
use std::{sync::Mutex, collections::HashMap};
use once_cell::sync::OnceCell;
fn global_data() -> &'static Mutex<HashMap<i32, String>> {
    static INSTANCE: OnceCell<Mutex<HashMap<i32, String>>> = OnceCell::new();
    INSTANCE.get_or_init(|| {
        let mut m = HashMap::new();
        m.insert(13, "Spica".to_string());
        m.insert(74, "Hoyten".to_string());
        Mutex::new(m)
    })
}
```
