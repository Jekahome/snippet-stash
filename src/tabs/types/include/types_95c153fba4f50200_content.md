


<pre><code class="language-rust">
fn main(){
 let s = "42";
 let n = s.parse::<i32>().unwrap();
 assert_eq!(n, 42i32);
}
</code></pre>
