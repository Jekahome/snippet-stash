


```rust
use std::pin::Pin;
use futures::{future, Future};

fn test() -> Pin<Box<dyn Future<Output = Result<bool, ()>>>> {
    Box::pin(future::ok(true))
}

async fn async_fn() -> bool {
    test().await.unwrap()
}
fn main(){}
```
