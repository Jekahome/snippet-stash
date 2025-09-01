


<pre><code class="language-rust">
fn main(){
    let mut s = String::from("...");
    let m_slice:&mut [String] = std::slice::from_mut(&mut s);
    let slice:&[String] = std::slice::from_ref(&s);
}
</code></pre>
