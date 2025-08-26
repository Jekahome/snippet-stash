


<pre><code class="language-rust">
fn main(){
 let rgb = (200, 0, 0);

 match rgb {
    (r, _, _) if r < 10 => println!("Not much red"),
    (_, g, _) if g < 10 => println!("Not much green"),
    (_, _, b) if b < 10 => println!("Not much blue"),
    _ => println!("Each color has at least 10"),
 }
}
</code></pre>
