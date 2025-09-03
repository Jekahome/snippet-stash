


<pre><code class="language-rust">
use std::borrow::Cow;
fn main(){
    let mut cow = Cow::Borrowed("foo");
    cow.to_mut().make_ascii_uppercase();
    assert_eq!( cow, Cow::Owned(String::from("FOO")) as Cow<str>);
}
</code></pre>

Клонирует данных, если они еще не принадлежат ему.
<pre><code class="language-rust">
use std::borrow::Cow;
fn main(){
    let s = "Hello world!";
    let cow = Cow::Borrowed(s);
    assert_eq!(cow.into_owned(), String::from(s));
}
</code></pre>
