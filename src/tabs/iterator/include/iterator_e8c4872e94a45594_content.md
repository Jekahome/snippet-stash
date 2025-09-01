


<pre><code class="language-rust edition2024">
#![feature(coroutines, coroutine_trait)]
#![feature(stmt_expr_attributes)]

use std::ops::{Coroutine, CoroutineState};
use std::pin::Pin;

pub fn main() {
    let one: &str = "1";
    let three = String::from("3");
    let ret: &str = "hello";
    
    let mut coroutine = #[coroutine]
    move || {
        println!("{}", one);
        yield 1;
        println!("{}", three);
        ret // возвращаемое значение
    };
     
    // Первый вызов - до первого yield
    match Pin::new(&mut coroutine).resume(()) {
        CoroutineState::Yielded(1) => {}
        _ => panic!("unexpected value from resume"),
    }
    
    println!("2");
    
    // Второй вызов - после yield до завершения
    match Pin::new(&mut coroutine).resume(()) {
        CoroutineState::Complete(s) if s == "hello" => {}
        _ => panic!("unexpected value from resume"),
    }
    
    println!("4");
}
</code></pre>

Run:
```
cargo +nightly run
```

