


```rust
pub struct Wrapper(pub i32);

impl Drop for Wrapper {
    fn drop(&mut self) {}
}

const ANSWER: Wrapper = Wrapper(42);

pub fn the_answer() -> &'static Wrapper {
    // `Wrapper` has a destructor, so the promotion to the `'static`
    // lifetime for a reference to a constant does not apply.
    &ANSWER
}
fn main(){}
```
