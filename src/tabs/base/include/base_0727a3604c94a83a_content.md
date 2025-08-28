


Следует избегать реализации Into и реализовывать From. 
Реализация From автоматически обеспечивает реализацию благодаря Into общей реализации в стандартной библиотеке.

Мы хотим, чтобы универсальная функция принимала все аргументы, которые могут быть преобразованы в указанный тип T

Пример: ф-ция принимает любой аргумент преобразующейся в `Vec<u8>` благодаря Into
<pre><code class="language-rust">
fn is_hello<T: Into<Vec<u8>>>(s: T) {
    let bytes = b"hello".to_vec();
    assert_eq!(bytes, s.into());
}
fn main(){
    // Into автореализация `impl Into<Vec<u8>> for String`
    let s = "hello".to_string();
    is_hello(s);
}
</code></pre>

--- 

Если: `From<T> for U` "auto implies" => `Into<U> for T`

То для:  `impl From<&str> for String` "auto implies" => `Into<String> for &str`
<pre><code class="language-rust">
fn main(){
  let s:&str = "hello";
  let heap:String = s.into();// `Into<String> for &str`
  let heap:String = String::from(s);// `impl From<&str> for String`

  // То для: `impl<'a> From<String> for Cow<'a, str>` "auto implies" => `Into<Cow<'a, str>> for String`
  use std::borrow::Cow;
  let heap:String = "hello".to_string();
  let c:Cow<'_,str> = heap.into(); // `Into<Cow<'a, str>> for String`
  let s:String = c.into_owned();
}
</code></pre>
