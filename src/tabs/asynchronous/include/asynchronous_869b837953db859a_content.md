


<pre><code class="language-rust">
use futures::future::{self, FutureExt};
use std::panic;

#[tokio::main]
async fn main() {
    // Асинхронная задача, которая может вызвать панику
    let safe_future = async {
        let result: Result<u32, &str> = Err("An error occurred!");
        match result {
            Ok(value) => println!("Task succeeded with value: {}", value),
            Err(err) => {
                println!("Task failed with error: {}", err);
                panic!("Simulating panic for demonstration purposes");
            }
        }
    };
    // Использование `catch_unwind` для безопасности
    let safe_result = future::catch_unwind(safe_future).await;
    match safe_result {
        Ok(_) => println!("Task completed without panic."),
        Err(err) => {
            if let Some(message) = err.downcast_ref::<&str>() {
                println!("Caught panic: {}", message);
            } else {
                println!("Caught an unknown panic type.");
            }
        }
    }
}
</code></pre>
