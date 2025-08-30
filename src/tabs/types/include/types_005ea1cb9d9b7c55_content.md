

Здесь запятая после значения обязательна, чтобы отличить кортеж с одним элементом от простого выражения в скобках.
<pre><code class="language-rust">
fn test() -> (String,){
    ("".to_string(),)
}

fn main(){
    let _r: (String,) = test();
}
</code></pre>
