

```rust
// Static dispatch.
mod static_dispatch {
    use super::*;
    mod receives {
        use super::*;
        pub fn accept_error<E: Error>(error: E) {
            println!("Handling ErrorOne Debug: {:?}", error);
            println!("Handling ErrorOne Display: {}", error);
        }
        pub fn accept_error_with_syntactic_sugar(error: impl Error) {
            println!("Handling ErrorOne Debug: {:?}", error);
            println!("Handling ErrorOne Display: {}", error);
        }
    }
    mod returns {
        use super::*;
        pub fn return_error_one() -> ErrorOne {
            ErrorOne
        }
        pub fn return_error_two() -> ErrorTwo {
            ErrorTwo
        }

        // 🚨 DOES NOT WORK! Need dynamic dispatch.
        // pub fn return_single_error() -> impl Error {
        //     if random_bool() {
        //         ErrorOne
        //     } else {
        //         ErrorTwo
        //     }
        // }

        pub fn return_single_error() -> impl Error {
            return ErrorOne;
        }
    }
}
fn main(){}
```
