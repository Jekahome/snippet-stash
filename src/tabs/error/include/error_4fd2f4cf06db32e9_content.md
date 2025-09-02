

<pre><code class="language-rust">
fn main(){
     match something(path) {
        Ok(sum) => println!("the sum is {}", sum),
        Err(err) => {
            if let Some(e) = err.downcast_ref::<std::io::Error>() {
               // ...
            } else if let Some(e) = err.downcast_ref::<std::num::ParseIntError>() {...}
        }
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let err_io = std::io::Error::new(std::io::ErrorKind::Other, "oh no!");
    let mut custom_error:Result<(), &dyn std::error::Error> = std::result::Result::Err(&err_io);

    match custom_error {
        Err(ref mut e) => {
            if e.is::<std::io::Error>(){
                if let Some(err_io) = e.downcast_ref::<std::io::Error>(){
                    println!("{}",err_io.kind());// other error
                } 
            }
        },
        _ => {}
    }
}
</code></pre>
