


```rust
mod a {
        pub (super) struct Foo;// даем pub для использования через super
        struct Foo_privat;
        mod b{
            use super::Foo;// ok
            use super::Foo_privat;// ok
        }
}

mod b {
     use super::a::Foo;// ok
     use super::a::Foo_privat;// Error: struct `Foo_privat` is private
}
fn main(){}
```
