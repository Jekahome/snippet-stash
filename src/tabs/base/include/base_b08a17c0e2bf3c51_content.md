

Каждый let оператор неявно вводит область видимости:
<pre><code class="language-rust">
fn main(){
 let x = 0;
 let z;
 let y = &x;
 z = y;
}
</code></pre>

Раскроется в это:
<pre><code class="language-rust">
fn main(){
 'a: {
    let x: i32 = 0;
    'b: {
        let z: &'b i32;
        'c: {
            // Здесь необходимо использовать 'b, потому что эта ссылка передается в эту область
            let y: &'b i32 = &'b x;
            z = y;
        }
    }
 }
}
</code></pre>
