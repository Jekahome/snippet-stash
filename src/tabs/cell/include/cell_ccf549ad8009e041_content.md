

```
pub struct MyCell<T> {
    value: T,
}

impl<T> MyCell<T> {
    pub fn new(value: T) -> Self {
        MyCell { value }
    }

    pub fn get(&self) -> &T {
        &self.value
    }

    pub fn set(&self, value: T) {
        // Используем unsafe код, чтобы изменить внутреннее значение без использования &mut
        unsafe {
            let self_mut = self as *const MyCell<T> as *mut MyCell<T>;
            (*self_mut).value = value;
        }
    }
}
```
