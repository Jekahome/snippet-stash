


<pre><code class="language-rust no_run edition2024">
// lib.rs
pub mod network;
pub use network::{client, server};

</code></pre>

Теперь пользователи вашей библиотеки смогут просто использовать готовый импорт `use lib::client` и `use  lib::server`

Хорошая практика группировки таких импортов под общим названием `prelude`

<pre><code class="language-rust no_run edition2024">
pub mod prelude {
    pub use super::{
        cli::RepContent, client, errors, service, settings::Set,
    };
}
</code></pre>

Тогда пользователи библиотеки смогут сразу импортировать все компоненты:

```
use prelude::*;
```
