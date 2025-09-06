

Атрибут `#[doc(no_inline)]` управляет тем, как будут показываться ссылки на элементы **внешних** библиотек в документации

Если вы делаете `pub use something::Type;`, то при генерации документации Rustdoc может «инлайнить» документацию этого типа прямо в вашу.
То есть пользователю не надо идти в документацию внешнего крейта — описание покажется сразу.

Чтобы не засорять свою документацию гигантскими вставками из чужих библиотек можно добавить `#[doc(no_inline)]` и в вашей документации появится **только ссылка** на оригинальную документацию, но сам текст не будет продублирован.

---

Атрибут `#[doc(hidden)]` убирает помеченный код из документации

<pre><code class="language-rust">
#[doc(hidden)]
pub struct InternalData {
    // Этот тип не будет показан в документации
    // Но доступен для использования в коде
}
</code></pre>

---

Атрибут `#[doc(cfg(...))]` - условная документация по feature flags
 
<pre><code class="language-rust">
#[doc(cfg(feature = "async"))]
pub struct AsyncClient {
    // Показывается в документации только если включен feature "async"
}

#[doc(cfg(target_os = "linux"))]
pub fn linux_only_function() {
    // Документируется только для Linux
}
</code></pre>

---

Атрибут `#[doc(alias = "...")]` - псевдонимы для поиска
<pre><code class="language-rust">
#[doc(alias = "create")]
#[doc(alias = "new")]
#[doc(alias = "make")]
pub fn create_new_instance() -> MyStruct {
    // Можно искать по "create", "new", "make"
}
</code></pre>

---

Атрибут `#[doc(include = "...")] `- включение внешнего файла документации

В файле ../docs/network_module.md:
```
// # Network Module
// 
// Этот модуль предоставляет функциональность для работы с сетью.
// Поддерживает TCP и UDP протоколы.
```

В файле lib.rs:
<pre><code class="language-rust">
#[doc(include = "../docs/network_module.md")]
pub mod network {
    /// TCP клиент
    pub struct TcpClient;
    
    /// UDP клиент  
    pub struct UdpClient;
}
</code></pre>

Атрибут `#[cfg(doctest)]` — это условная компиляция, которая активируется только во время прогонки doctests. Обычно её применяют для подключения README.md и других внешних файлов к системе документационных тестов.


