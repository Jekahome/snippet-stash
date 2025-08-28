


<pre><code class="language-rust">
fn main(){
 let num: u32 = 5;
 let big_num: u64 = num.into();
 let small_num: u16 = big_num.try_into().expect("Value is too big");
}
</code></pre>
