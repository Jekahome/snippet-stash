


<pre><code class="language-rust">
fn main(){
// Компилятор автоматически использует std::iter::Iterator для выражений вида:
    for item in collection {
        // body
    }

// эффективно преобразуя их в код примерно такого вида:
    let mut iter = collection.into_iter();
    loop {
        let item: Thing = match iter.next() {
            Some(item) => item,
            None => break,
        };
        // body
    }

// или более кратко и идиоматично:
    let mut iter = collection.into_iter();
    while let Some(item) = iter.next() {
        // body
    }
}
</code></pre>
