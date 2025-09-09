


```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum Error {}

#[derive(Error, Debug)]
enum MainError {
    #[error("Sub error: {0}")]
    Sub(#[from] Error),
}

fn main() -> Result<(), MainError> {
    let r = your_wrapper(|| {
       println!("Inside wrapper");
       Ok::<_, Error>(())
    })?;

    println!("Following call");
    Ok(r)
}
```
