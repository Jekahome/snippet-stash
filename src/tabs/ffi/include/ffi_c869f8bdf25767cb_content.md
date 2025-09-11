


```
use std::thread;

#[no_mangle]
pub extern fn process() {
    let handles: Vec<_> = (0..10).map(|_| {
        thread::spawn(|| {
            let mut x = 0;
            for _ in 0..5_000_000 {
                x += 1
            }
            x
        })
    }).collect();
    for h in handles {
        println!("Поток завершился со счётом={}",
                 h.join().map_err(|_| "Не удалось соединиться с потоком!").unwrap());
    }
}
```

Где :
* `#[no_mangle]` - не дает Rust компилятору изменить имя функции
* `pub` - вызов ф-ции за пределами модуля
* `extern` - возможность вызвать из `C` языка

В Cargo.toml добавим что скажет компилятору скомпилировать не rlib а в динамическую библиотеку dylib

```toml
[lib]
name = "embed"
crate-type = ["dylib"]
```

Выполнив сборку `$cargo build --release`

Получим исполняемый файл `ibembed.so` или `embed.dll` или `libembed.dylib`

**К примеру для использования в Node.js**:

скачаем `$ npm install fii`

javascript:

```javascript
var ffi = require('ffi'); // подключение к библиотеки ffi
2. var lib = fii.Library('target/release/libembed',{ 'process':['void',[]]}); // загрузка библиотеки Rust т.е. ее функции process()
3. lib.process(); // вызов загруженной функции без аргументов так как стоит [] и без возвращаемого значения так как стоит 'void'
```


