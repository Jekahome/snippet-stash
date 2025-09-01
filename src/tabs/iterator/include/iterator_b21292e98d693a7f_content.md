


<pre><code class="language-rust">
use std::ops::ControlFlow;
fn main(){
    let r = (2..100).try_for_each(|x| {
        if 323 % x == 0 {
            return ControlFlow::Break(x)
        }
        ControlFlow::Continue(())
    });
    assert_eq!(r, ControlFlow::Break(17));
}
</code></pre>



<pre><code class="language-rust">
use std::io::{stdout, Write,Error, ErrorKind};
fn main(){
    let data = [1, 2, 3,4];
    let res = data.iter().try_for_each(|&x|
        if x <= 2 {
            writeln!(stdout(), "{}", x);
           Ok(())
        }else{
            Err(Error::new(ErrorKind::Other,  format!("{}", format_args!("Error pop {}", x))))
        }
    );
    match res {
        Err(e) => println!("{}",e),// Error pop 3
        _ => println!("")
    }
}
</code></pre>
