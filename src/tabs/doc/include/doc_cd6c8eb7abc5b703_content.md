

**1. Examples** - Примеры использования
```
/// # Examples
///
/// &#96;&#96;&#96;rust
/// let result = function();
/// assert_eq!(result, 42);
/// &#96;&#96;&#96;
fn function() -> i32 {
    42
}
```
 
**2. Panics** - Когда функция паникует
```
/// # Panics
///
/// Panics if input is empty:
/// &#96;&#96;&#96;rust,should_panic
/// function("");
/// &#96;&#96;&#96;
fn function() -> i32 {
    42
}
```
 
**3. Errors** - Возвращаемые ошибки
```
/// # Errors
///
/// Returns `Err(io::Error)` if file not found.
```

 
**4. Safety** - Для unsafe функций
```
/// # Safety
///
/// Pointer must be non-null and valid.
```
 
 
**5. Arguments** - Описание параметров
```
/// # Arguments
///
/// * `name` - User's display name
/// * `age` - Must be between 0 and 150
```
 
**6. Returns** - Описание возвращаемого значения
```
/// # Returns
///
/// `Some(value)` if found, `None` otherwise.
```
 
**7.  Availability** - Требования к фичам/версиям
```
/// # Availability
///
/// Requires feature "advanced":
/// &#96;&#96;&#96;toml
/// [dependencies]
/// crate = { features = ["advanced"] }
/// &#96;&#96;&#96;
```



**8. Notes** - Дополнительные заметки
```
/// # Notes
///
/// This uses a custom allocator for performance.
```
 
**9. Warning** - Важные предупреждения
```
/// # Warning
///
/// ⚠️ This may cause memory leaks!
```
 
**10. Deprecated** - Устаревшие функции
```
/// # Deprecated
///
/// Use `new_function()` instead.
#[deprecated(since = "1.0.0")]
fn function()->i32{
    42
}

fn new_function(){
 ...
}
```
  
**11. See Also** - Ссылки на related functionality
```
/// # See Also
///
/// - [`other_function`] - Similar functionality
/// - [`std::vec::Vec`] - Standard library equivalent
```

**12. Implementation** - Детали реализации
```
/// # Implementation
///
/// Uses Boyer-Moore algorithm for O(n/m) performance.
```

**13. Performance** - Характеристики производительности
```
/// # Performance
///
/// Time complexity: O(n log n)
/// Space complexity: O(1)
```





 
