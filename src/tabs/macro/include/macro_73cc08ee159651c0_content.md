


```
cargo install cargo-expand

```
--- 

**File src/lib.rs**:
```
pub mod example{
        use frame_support::parameter_types;
        parameter_types! {
                        pub const MockBlockHashCount: u64 = 250;
   }
}
fn foo(){}
```


Результат:
```
$ cargo  expand --lib example
```

```
pub mod example {
    use frame_support::parameter_types;
    pub struct MockBlockHashCount;
    impl MockBlockHashCount {
        /// Returns the value of this parameter type.
        pub const fn get() -> u64 {
            250
        }
    }
    impl<I: From<u64>> ::frame_support::traits::Get<I> for MockBlockHashCount {
        fn get() -> I {
            I::from(250)
        }
    }
}
```

---- 

**File src/main.rs**
```
#[derive(Debug)]
struct S;
fn main() {
    println!("{:?}", S);
}
```

Результат:
```
$ cargo expand
```
 
```
#![feature(prelude_import)]
#[prelude_import]
use std::prelude::v1::*;
#[macro_use]
extern crate std;
struct S;
#[automatically_derived]
#[allow(unused_qualifications)]
impl ::core::fmt::Debug for S {
    fn fmt(&self, f: &mut ::core::fmt::Formatter) -> ::core::fmt::Result {
        match *self {
            S => {
                let mut debug_trait_builder = f.debug_tuple("S");
                debug_trait_builder.finish()
            }
        }
    }
}
fn main() {
    {
        ::std::io::_print(::core::fmt::Arguments::new_v1(
            &["", "\n"],
            &match (&S,) {
                (arg0,) => [::core::fmt::ArgumentV1::new(arg0, ::core::fmt::Debug::fmt)],
            },
        ));
    };
}
```
