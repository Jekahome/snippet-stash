

Boolean можно привести к числу
<pre><code class="language-rust">
fn main(){
 let true_false = (true, false);
 println!("{} {}", true_false.0 as u8, true_false.1 as i32);
}
</code></pre>

 
<pre><code class="language-rust">
fn main(){
 let true_false: (i128, u16) = (true.into(), false.into());
 println!("{} {}", true_false.0, true_false.1);
}
</code></pre>
Но число нельзя привести к Boolean
