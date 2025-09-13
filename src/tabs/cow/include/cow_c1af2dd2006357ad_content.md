

```
/// Ошибка, возникающая, когда операция не разрешена текущим состоянием объекта.
#[cfg_attr(target_family = "wasm", wasm_bindgen)]
#[derive(Debug)]
pub struct StateError {
    /// Message describing the problem.
    message: Cow<'static, str>,

    /// Stacktrace of this [`StateError`].
    trace: Trace,
}
impl StateError {
    #[must_use]
    pub fn new<T: Into<Cow<'static, str>>>(message: T, trace: Trace) -> Self {
        Self {
            message: message.into(),
            trace,
        }
    }
}
```
