

Проверяет, что индексный байт лежит в начале и/или конце последовательности кодовых точек UTF-8.
<pre><code class="language-rust">
fn main(){
    println!("{}",str.is_char_boundary(1));// для кириллицы первый байт - true , второй - false
}
</code></pre>
