


<pre><code class="language-rust">
fn main(){
    let y:&i32;
    let x = 5;
    y = &x; // Ошибка `x` does not live long enough
   // Сначало удалится `x` а он содержит данные на которые ссылается `y`
}
</code></pre>
