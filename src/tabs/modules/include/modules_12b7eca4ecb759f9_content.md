


```
// lib.rs
pub mod network;
pub use network::{client, server};

```

Теперь пользователи вашей библиотеки смогут просто использовать готовый импорт `use lib::client` и `use  lib::server`

Хорошая практика группировки таких импортов под общим названием `prelude`

```
pub mod prelude {
    pub use super::{
        cli::RepContent, client, errors, service, settings::Set,
    };
}
```

Тогда пользователи библиотеки смогут сразу импортировать все компоненты:

```
use prelude::*;
```
