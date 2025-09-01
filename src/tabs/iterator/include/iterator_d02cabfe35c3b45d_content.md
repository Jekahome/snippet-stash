


<pre><code class="language-rust">
#![feature(iter_next_chunk)]
fn main(){
    let quote = "not all those who wander are lost";
    let [first, second, third] = quote.split_whitespace().next_chunk::<3>().unwrap();
    assert_eq!(first, "not");
    assert_eq!(second, "all");
}
</code></pre>
