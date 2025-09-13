

```
fn main(){
    let mut c = Config::default();
    //let mut c = Config::new();

    //c.set_default("mode.debug", true).unwrap();

    let mut c2 = Config::try_from(&my_conf)?; Работатет слияние двух конфигов
    c.merge(c2).unwrap();

    //let mut c = Config::try_from(&my_conf)?; Создание с состояния структуры и последующий merge не работатет
    c.merge(File::new("Settings_test", FileFormat::Toml)).unwrap();
    c.merge(File::new("Settings_test2", FileFormat::Toml)).unwrap();
}
```
