

Разыменовывает один уровень косвенности
<pre><code class="language-rust">
fn main(){
    let box = Box:new(Some(123));

    if let Some(n) = *box{
     assert_eq!(n,123);
    }
}
</code></pre>
