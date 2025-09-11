

```rust
#![allow(dead_code)]
mod queue {
    pub const SIZE_ARRAY: usize = 5;
    #[derive(Debug)]
    pub struct Queue<T> {
        pub value: [T; SIZE_ARRAY],
        index: usize,
    }
    impl<T> Queue<T> {
        pub fn push(&mut self, value: T) -> bool {
            if self.index < SIZE_ARRAY - 1 { self.value[self.index] = value;self.index += 1; return true; } return false;
        }
        pub fn pop(&mut self) -> Option<T> where T: Clone {
            if self.index > 0 { self.index -= 1; return Some(self.value[self.index].clone()); } return None;
        }
        pub fn new(value: [T; SIZE_ARRAY]) -> Self {
            Queue { value: value, index: Default::default() }
        }
    }
    #[cfg(test)]
    mod test {
        use super::*;
        trait Base: std::fmt::Debug {}
        impl Base for i32 {}
        impl Base for bool {}

        #[derive(Debug)]
        struct Item {  data: i32 }
        impl Base for Item {}

        #[test]
        fn test_queue() {
            // Test dynamic dispatch
            let arr: [&dyn Base; SIZE_ARRAY] = [&false; SIZE_ARRAY];
            let mut buffer: Queue<&dyn Base> = Queue::new(arr);

            buffer.push(&true);
            buffer.push(&Item { data: 4 });
            buffer.push(&5i32);

            if let Some(_var) = buffer.pop() {  assert!(true);} else {  assert!(false); }

            // Test static dispatch
            let arr: [i32; SIZE_ARRAY] = [0i32; SIZE_ARRAY];
            let mut buffer: Queue<i32> = Queue::new(arr);

            buffer.push(4);
            buffer.push(5);
            if let Some(var) = buffer.pop() { assert_eq!(5, var); } else { assert!(false); }
    }
   }
}
fn main(){}
```
