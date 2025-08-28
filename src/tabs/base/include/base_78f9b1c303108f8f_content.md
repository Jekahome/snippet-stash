


<pre><code class="language-rust">
fn main(){
{
  let x: Vec<i32> = Vec::new();  // ----------------------+
  {//                                                     |
      let y = String::from("Why");// ------+              |
    //                                     | y's lifetime |
  } // <-----------------------------------+              |
} // <----------------------------------------------------+
}
</code></pre>
