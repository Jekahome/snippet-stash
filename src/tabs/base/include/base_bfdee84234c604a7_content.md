

 
<pre><code class="language-rust">
#[allow(dead_code)]
fn typed_example(){}


// установить всю группу `pedantic` clippy lint для предупреждения
#![warn(clippy::pedantic)]
// не сигнализировать warnings from the `filter_map` clippy lint
#![allow(clippy::filter_map)]

fn main() {
    // ...
}

// не сигнализировать the `cmp_nan` clippy lint just for this function
#[allow(clippy::cmp_nan)]
fn foo() {
    // ...
}
</code></pre>
