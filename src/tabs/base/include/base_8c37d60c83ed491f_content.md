

* Позиция для каждого аргумента.
```rust
fn main(){
    println!("{0}, это {1}. {1}, это {0}", "Алиса", "Боб");
    println!( "{1} {} {nine} {0} {} {nine}", 33, 2, nine=9 );// 2 33 9 33 2 9 
    println!("{1:?}, {0}", "and welcome", Some(42));// Some(42), and welcome
}
```

* Именованные аргументы.
```rust
fn main(){
    println!("{subject} {verb} {object}",
             object="ленивую собаку",
             subject="быстрая коричневая лиса",
             verb="прыгает через");
}
```
 
* Бинарный
```rust
fn main(){  
    println!("{} из {:b} людей знают, что такое двоичный код, а остальные нет.", 1, 2); 
}
```

* Число в двоичном формате
```rust
fn main(){
 let x = 42; // 42 is '101010' in binary
 println!("{:b}", x);// 101010
 println!("{:#b}", x);// 0b101010
}
```

* Вместе RAW и байты
```rust
fn main(){ println!("{:?}", br##"I like to write "#"."##);}
```

* Вывод байт 
```rust
fn main(){
    println!("binary -127={:08b}",-127_i8);// -127=10000001
}
```

* Вывод f64
```rust
fn main(){
    let mut money = 100.99999;
 loop{
  money=money-0.00001f64;
  println!("Money: {0:.5}", money); // Money: 100.99998
  sleep(Duration::new(3, 0));
 }
}
```

* Hex, Octal, Binary форматирование 

```
std::fmt::UpperHex
std::fmt::LowerHex
std::fmt::Octal
std::fmt::Binary
```
 
Эти черты контролировать представление типа под `{:X}`, `{:x}`, `{:o}` и `{:b}` спецификаторов формата.
```rust
fn main(){
 // число в шестнадцатеричном формате с A до F
 println!("{:#X}", 255);//{:#X} => 0xFF , {:X} => FF

 // RGB (128, 255, 90) 0x80FF5A
 print!( "RGB ({red}, {green}, {blue}) {red:#X}{green:X}{blue:X}",red=128, green=255, blue=90 )
}
```

Реализуйте эти черты для любого числового типа, с которым вы могли бы подумать о побитовых манипуляциях, таких как | или &

* Можно выравнивать текст, сдвигая его на указанную ширину.
   Данный макрос отобразит в консоли

```rust
fn main(){
  // "     1". 5 пробелов и "1".
   println!("{number:>width$}", number=1, width=6);

  // Отступ 5 пробелов
   println!("{:<5} {}",1,2);
}
```
 
* Добавить нулей. Данный макрос выведет "000001".
```rust
fn main(){
   println!("{number:>0width$}", number=1, width=6);
   println!("{:0width$}|",1, width=5 );//00001|  
   println!("{:04}", 42);    // => "0042
}
```
 
* Задает число десятичных знаков в типах с плавающей запятой `{:. *}` :
```rust
fn main(){
    let formatted_number = format!("{:.*}",2, 1.234567);
    assert_eq!("1.2346",&format!("{:.*}",4, 1.234567));
}
```

