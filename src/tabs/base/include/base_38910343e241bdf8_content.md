


<pre><code class="language-rust">
use std::fmt::Debug;
fn print_it( input: impl Debug + 'static ) {
    println!( "Переданное значение 'static равно: {:?}", input );
}
fn main() {
    // I владеемое и не имеет ссылок, следовательно является 'static:
    let i = 5;
    print_it(i);

    // Упс, &I имеет время жизни, ограниченное областью видимости main(), поэтому оно не 'static:
    //print_it(&i);
    
     let y:&'static str = "hello";
     print_it(y);
}
</code></pre>
