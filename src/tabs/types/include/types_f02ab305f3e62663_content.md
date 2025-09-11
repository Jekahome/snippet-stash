


```rust
pub trait A {}
pub trait HasA {
    type A: A;
    fn gimme_a() -> <Self as HasA>::A;
}

pub trait RichA: A {}
pub trait RichHasA: HasA {
    type A: RichA;
    fn gimme_a() -> <Self as RichHasA>::A;
    // ... more things go here ...
}
fn main(){}
```
