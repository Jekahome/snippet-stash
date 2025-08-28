


<pre><code class="language-rust">
fn add_with_lifetimes<'a:'b, 'b>(i: &'a i32, j: &'b i32) -> &'b i32 {
     if *i > 0 {
         return i;
     }else{
         return j;
     }
}
fn main() {
 let a = 1;
 let b = 2;
 println!("{}", add_with_lifetimes(&a,&b));
}
</code></pre>

---
`<'a: 'b, 'b>` читается как "время жизни `'a` не меньше, чем время жизни `'b`".
Здесь мы получаем  `&'a i32` и в результате приведения возвращаем `&'b i32`.
<pre><code class="language-rust">
fn choose_first<'a: 'b, 'b>(first: &'a i32, _: &'b i32) -> &'b i32 {
    first
}

fn main() {
    let first = 2; // Более длинное время жизни
    
    {
        let second = 3; // Более короткое время жизни
        
        println!("Произведение равно {}", multiply(&first, &second));
        println!("{} первое", choose_first(&first, &second));
    };
}
// или привести к меньшему времени

// Здесь Rust выводит наиболее короткое время жизни.
// Затем обе ссылки приводятся к этому времени жизни.
fn multiply<'a>(first: &'a i32, second: &'a i32) -> i32 {
    first * second
}
</code></pre>
