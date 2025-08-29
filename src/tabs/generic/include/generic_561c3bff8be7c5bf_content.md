

При динамической диспетчеризации нет общего способа узнать тип чего-либо, ваши значения - это просто байты в памяти без каких-либо метаданных. 
Черта `Any` частично решает эту проблему.

С помощью Any мы можем написать такой код, чтобы легко преобразовывать значения:
<pre><code class="language-rust">
use std::any::{Any, TypeId};
fn log(value: &dyn Any) {
    match value.downcast_ref::<String>() {
        Some(text) => println!("Bytes of the string: {:?}", text.as_bytes()),
        None => println!("No string...")
    };
}
fn main() {
    // &T is coerced into &dyn Any:
    log(&String::from("hello"));
    log(&10);
}
</code></pre>
