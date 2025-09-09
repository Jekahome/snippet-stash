

Удалить пробелы.
Если входные данные будут мутироваться, то вернем String иначе возвращать входную строку `&str`.
Т.е. клонирование при мутации `Cow`, отложите выделение памяти как можно на дольше.
```rust
use std::borrow::Cow;
// вариант с AsRef т.е. можно String присылать
fn remove_spaces<'a>(input: &'a(impl AsRef<str> + ?Sized)) -> Cow<'a, str> { // <'a> что бы можно было вернуть  Cow<'a...
    let input = input.as_ref();
    if input.contains(' ') {
        input
        .chars()
        .filter(|&x| x != ' ')
        .collect::<std::string::String>()
        .into()
    } else {
        // input.into() // Into<Cow<'a, str>> 
        // или полный синтаксис
        Into::<Cow<'_, str>>::into(input)  
    }
} 
fn main(){
    let s = remove_spaces("Herman"); // Cow::Borrowed  
    let len = s.len(); // impl Deref
    let owned: String = s.into_owned(); // memory is allocated for a new string

    let binding = "Herman Radtke".to_string();
    let s = remove_spaces(&binding); // Cow::Owned 
    let len = s.len(); // impl Deref
    let owned: String = s.into_owned(); // no new memory allocated as we already had a String
}
```
