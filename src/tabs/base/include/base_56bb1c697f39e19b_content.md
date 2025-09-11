


Оно обозначает, что что-то имеет время жизни, равное времени жизни всей программы.
И занимает постоянно место !!!
Потому что ссылка всегда действительна: строки располагаются в сегменте данных конечного двоичного файла

Способ создать lifetime static:
* **1.** Создание строкового литерала, имеющего тип `&'static str`
    <pre><code class="language-rust">
     fn main(){
      let x: &'static str = "Привет, мир.";
     }
   </code></pre>
        

* **2.** Создание константы с ключевым словом static.
```rust
fn main(){
    // i32 добавляется в сегмент данных двоичного файла, а `x` ссылается на него
    static FOO: i32 = 5;
    let x: &'static i32 = &FOO;
}
```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
* **3.** `'static` как часть ограничения типажа:
```rust
fn generic<T>(x: T) where T: 'static {}
fn main(){}
```
   
--- 
 
```rust
static NUM: i32 = 18;

// `'static` приводится к lifetime аргумента
fn coerce_static<'a>(_: &'a i32) -> &'a i32 {
    &NUM
}
fn main() {
    {
        // Создадим строковый литерал и выведем его:
        let static_string = "Я в неизменяемой памяти";
        println!("static_string: {}", static_string);

        // Когда `static_string` выходит из области видимости, ссылка
        // на неё больше не может быть использована, но данные остаются в бинарном файле !!!
    }
    {
        let lifetime_num = 9;

        // Приведём `NUM` ко времени жизни `lifetime_num`:
        let coerced_static = coerce_static(&lifetime_num);

        println!("coerced_static: {}", coerced_static);
    }
    
    println!("NUM: {} остаётся доступным!", NUM);
}
```


