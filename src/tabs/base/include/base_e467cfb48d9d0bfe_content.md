

Более длительный срок службы может быть принужден к более короткому, так что он работает внутри области, в которой он обычно не работал.
Это происходит в форме предполагаемого принуждения компилятором Rust, а также в виде объявления разницы в жизни:
<pre><code class="language-rust">
//  имеет максимально короткое время жизни.
// Эти две ссылки затем принуждаются к этому времени жизни.
fn multiply<'a>(first: &'a i32, second: &'a i32) -> i32 {
    first * second
}

// принуждаем время 'a укоротится до 'b
fn choose_first<'a: 'b, 'b>(first: &'a i32, _: &'b i32) -> &'b i32 {
    first
}

fn main() {
    let first = 2; // 'a Longer lifetime
    {
        let second = 3; // 'b Shorter lifetime

        println!("The product is {}", multiply(&first, &second));
        println!("{} is the first", choose_first(&first, &second));
    };
}
</code></pre>
