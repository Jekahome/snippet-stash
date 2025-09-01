


<pre><code class="language-rust">
fn main(){
    let bytes = include_bytes!("spanish.in");
    assert_eq!(bytes, b"adi\xc3\xb3s\n");
    print!("{}", String::from_utf8_lossy(bytes));
}
</code></pre>
