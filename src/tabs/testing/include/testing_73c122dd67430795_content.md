

```
pub use foo::*;
pub mod foo{
    fn ggg()->bool{
        true
    }
    pub fn ddd()->bool{
        true
    }

    #[cfg(test)]
    mod event_message_spec {
    use super::*;
         #[test]
        fn test_private() {
            print!("test");
            assert!(ggg())
        }
    }
}
#[cfg(test)]
mod event_message_spec {
use super::*;
     #[test]
    fn test_public() {
        print!("test");
        assert!(ddd())
    }
}
```
