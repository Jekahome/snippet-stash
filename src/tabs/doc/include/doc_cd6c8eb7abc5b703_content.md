

**1. Examples** - Примеры использования
<pre><code class="language-rust no_run edition2024">
/// # Examples
///
/// &#96;&#96;&#96;rust
/// let result = function();
/// assert_eq!(result, 42);
/// &#96;&#96;&#96;
fn function() -> i32 {
    42
}
</code></pre>
 
**2. Panics** - Когда функция паникует
<pre><code class="language-rust no_run edition2024">
/// # Panics
///
/// Panics if input is empty:
/// &#96;&#96;&#96;rust,should_panic
/// function("");
/// &#96;&#96;&#96;
fn function() -> i32 {
    42
}
</code></pre>
 
**3. Errors** - Возвращаемые ошибки
<pre><code class="language-rust no_run edition2024">
/// # Errors
///
/// Returns `Err(io::Error)` if file not found.
</code></pre>

 
**4. Safety** - Для unsafe функций
<pre><code class="language-rust no_run edition2024">
/// # Safety
///
/// Pointer must be non-null and valid.
</code></pre>
 
 
**5. Arguments** - Описание параметров
<pre><code class="language-rust no_run edition2024">
/// # Arguments
///
/// * `name` - User's display name
/// * `age` - Must be between 0 and 150
</code></pre>
 
**6. Returns** - Описание возвращаемого значения
<pre><code class="language-rust no_run edition2024">
/// # Returns
///
/// `Some(value)` if found, `None` otherwise.
</code></pre>
 
**7.  Availability** - Требования к фичам/версиям
<pre><code class="language-rust no_run edition2024">
/// # Availability
///
/// Requires feature "advanced":
/// ```toml
/// [dependencies]
/// crate = { features = ["advanced"] }
/// ```
</code></pre>



**8. Notes** - Дополнительные заметки
<pre><code class="language-rust no_run edition2024">
/// # Notes
///
/// This uses a custom allocator for performance.
</code></pre>
 
**9. Warning** - Важные предупреждения
<pre><code class="language-rust no_run edition2024">
/// # Warning
///
/// ⚠️ This may cause memory leaks!
</code></pre>
 
**10. Deprecated** - Устаревшие функции
<pre><code class="language-rust no_run edition2024">
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
</code></pre>
  
**11. See Also** - Ссылки на related functionality
<pre><code class="language-rust no_run edition2024">
/// # See Also
///
/// - [`other_function`] - Similar functionality
/// - [`std::vec::Vec`] - Standard library equivalent
</code></pre>

**12. Implementation** - Детали реализации
<pre><code class="language-rust no_run edition2024">
/// # Implementation
///
/// Uses Boyer-Moore algorithm for O(n/m) performance.
</code></pre>

**13. Performance** - Характеристики производительности
<pre><code class="language-rust no_run edition2024">
/// # Performance
///
/// Time complexity: O(n log n)
/// Space complexity: O(1)
</code></pre>





 
