

std::fmt::Display для пользователя 

std::fmt::Debug для программиста
<pre><code class="language-rust">
fn main(){
    let text = "hello\nworld ";
    println!("{}", text);// Display
    println!("{:?}", text); // Debug "hello\nworld "
}
</code></pre>
