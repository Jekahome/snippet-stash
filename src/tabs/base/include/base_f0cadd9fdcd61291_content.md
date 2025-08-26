


<pre><code class="language-rust">
fn main(){
 let x:i32 = 5;
 let y:i32 =  match x {
          5 => 5*5,
          _ => 0+0,
 };
 print!("{}",y);// 25
}
</code></pre>
