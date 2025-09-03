

Есть две версии Cow:
* beef::Cow - состоит из трех слов: указатель, длина и емкость. Он хранит тег владения в емкости.
* beef::lean::Cow - имеет ширину 2 слова и сохраняет длину, емкость и тег владельца в одном слове.
<pre><code class="language-rust">
use beef::Cow;
fn main(){
    let borrowed: Cow<str> = Cow::borrowed("Hello");
    let owned: Cow<str> = Cow::owned(String::from("World"));

    assert_eq!(
        format!("{} {}!", borrowed, owned),
        "Hello World!",
    );
}
</code></pre>
