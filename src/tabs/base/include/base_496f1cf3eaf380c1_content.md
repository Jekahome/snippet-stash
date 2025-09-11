

В этом примере `string1` действителен до конца внешней области действия, `string2` действителен до конца внутренней области и result ссылается на то, что действует до конца внутренней области.
```rust
 fn longest<'a >(x: &'a str, y: &'a str) -> &'a str { // Верно , время жизни совпадает со временем вызывающих данных
        if x.len() > y.len() {
            x
        } else {
            y
        }
  }
fn main(){
   let string1 = String::from("long string is long");

   {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("{}", result);
   }
}
```

--- 

Возврат `&str` с ошибкой
Ошибка показывает, что для того, чтобы result  был действительным для println!, `string2` должна быть действительна до конца внешней области. Так как время жизни одинаковое - берется наименьшее, то в `print!` данные `string2` уже недействительны.
```rust
fn main(){
    let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("{}", result);
}
```
