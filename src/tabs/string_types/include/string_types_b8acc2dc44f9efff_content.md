


<pre><code class="language-rust">
fn main(){
    let mut hello = String::from("Hello, World!");
    let world = hello.split_off(7);
    assert_eq!(hello, "Hello, ");
    assert_eq!(world, "World!");
}
</code></pre>
