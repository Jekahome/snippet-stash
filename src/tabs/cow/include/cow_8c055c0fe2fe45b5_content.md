

При преобразовании Path в string некоторые UTF-8 не могут быть преобразованы, если надо заменить символы на верные то вернется новая строка Cow::Owned иначе неизменная ссылающаяся на оригинал Cow::Borrowed 
<pre><code class="language-rust">
use std::borrow::Cow;
use std::path::Path;
fn main(){
    let path = Path::new("foo.txt");
    match path.to_string_lossy() { 
           Cow::Borrowed(_str_ref) => println!("path was valid UTF-8"),
           Cow::Owned(_new_string) => println!("path was not valid UTF-8"),
    }
}
</code></pre>
