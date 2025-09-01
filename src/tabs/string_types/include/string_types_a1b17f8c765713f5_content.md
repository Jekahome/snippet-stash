

Для безопасной альтернативы см. Str и Index. от начала до конца, включая начало, но исключая конец.
<pre><code class="language-rust">
fn main(){
    let s = "Löwe 老虎 Léopard";
    unsafe {
        println!("{}",s.slice_unchecked(0, s.len()));// Löwe 老虎 Léopard
    }
}
</code></pre>
