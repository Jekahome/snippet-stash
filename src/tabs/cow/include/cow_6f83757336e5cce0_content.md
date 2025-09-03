


<pre><code class="language-rust">
use std::borrow::Cow;
fn describe(error: &Error) -> Cow<'static, str> {
    match *error {
        // Возврат &'str - заимствованная ссылка на static str.
        Error::NotFound => "Error: Not found".into(),
        
        // Возврат String -  строка, выделенная в куче.
        Error::Custom(e) => format!("Error: {}", e).into(),
    }
}
</code></pre>
