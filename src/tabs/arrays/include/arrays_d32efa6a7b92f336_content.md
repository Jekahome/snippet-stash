

Поскольку эта функция принимает ссылку на срез , ее можно применить как к вектору, так и к массиву.
<pre><code class="language-rust">
fn print(n: &[i32]) {
      for elt in n {
            println!("{}", elt);
      }
}
fn main(){
      let v:Vec<i32> = vec![1,2,3];
      let a:[i32;3] = [1,2,3];
      print(&v); // работает с векторами
      print(&a); // работает с массивами
      print(&v[..2]); // диапазон
}
</code></pre>
