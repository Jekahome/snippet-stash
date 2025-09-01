


<pre><code class="language-rust">
// Удалить пробелы.Если входные данные будут мутироваться то вернем String иначе возвращать входную строку &str
// Т.е. клонирование при мутации Cow, отложите выделение памяти как можно на дольше.
use std::borrow::Cow;
fn remove_spaces<'a>(input: &'a str) -> Cow<'a, str> {
    if input.contains(' ') {
        input
        .chars()
        .filter(|&x| x != ' ')
        .collect::<std::string::String>()
        .into()
    } else {
       // input.into() // Into<Cow<'a, str>> 
       // или полный синтаксис
        Into::<Cow<'a, str>>::into(input)
    }
} 
// Вариант 2: еше и присылать String или &str (вариант с AsRef)
fn remove_spaces<'a>(input: &'a(impl AsRef<str> + ?Sized)) -> Cow<'a, str> {
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
</code></pre>
