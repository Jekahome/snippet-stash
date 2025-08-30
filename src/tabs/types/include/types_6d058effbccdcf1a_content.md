


<pre><code class="language-rust">
fn main(){
    let n:u16 = 255+255+255+255;// [3, 252] = 3*255 + 255-3 (u8 max 255)
    let s:[u8;2] = n.to_be_bytes();
    println!("\n{:?}",s); // [3, 252]
}
</code></pre>
