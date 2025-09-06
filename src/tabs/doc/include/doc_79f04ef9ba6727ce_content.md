

**Скрытие кода в примерах с помощью символа hash/sharp - #**
<pre><code class="language-rust">
/// # Examples
///
/// &#96;&#96;&#96;rust
/// # fn setup() -> String { "test".to_string() }
/// # let input = setup(); // hidden from docs
/// let result = process(&input);
/// # assert_eq!(result, "processed test");
/// &#96;&#96;&#96;
fn main(){
 ...
}
</code></pre>

----

**Условная документация с feature flags**
<pre><code class="language-rust">
/// # Examples
///
/// &#96;&#96;&#96;rust
/// # #[cfg(feature = "async")]
/// # async fn example() {
/// let result = async_function().await;
/// # }
/// &#96;&#96;&#96;
fn main(){
 ...
}
</code></pre>

----

**Ссылки на другие элементы**

* `[S]` - создайте ссылку на `struct, enum, trait, function,… T`.
* `[S](crate::S)` - локальная ссылка 

Атрибут `#![deny(broken_intra_doc_links)]` проверяет, что все сгенерированные гиперссылки действительны

<pre><code class="language-rust">
#![deny(broken_intra_doc_links)]

/// This function uses [`process_data`] internally.
///
/// For more complex processing, see [`AdvancedProcessor`].
///
/// [`process_data`]: crate::process_data
/// [`AdvancedProcessor`]: crate::processing::AdvancedProcessor
///
/// # See Also
///
/// - [`OtherStruct`] - Related structure
/// - [`some_function`] - Utility function
///
/// [`OtherStruct`]: crate::module::OtherStruct
/// [`some_function`]: crate::module::some_function
pub fn complex_operation() {
    // ...
}
fn main(){
 ...
}
</code></pre>

---
 
**Когда в документе отсутствует доступ к зависимости то можно добавить ссылку на результат поиска по документации**
<pre><code class="language-rust">
///
/// ... [`Message label`] ...
///
/// - [`Message label`](?search=ModelData::link) 
fn main(){
 ...
}
</code></pre>
