


<pre><code class="language-rust">
macro_rules! test_for{
     ($($x:expr),*) => {
       // цикл
       // $(...)* - ноль или более раз
       // $(...)+ - один или более раз
       $(
        println!("{:?}",$x);
       )*
     }
}
fn main(){
    test_for!(1,2,3,4);
}
</code></pre>
