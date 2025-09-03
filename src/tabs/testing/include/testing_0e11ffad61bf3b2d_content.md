


<pre><code class="language-rust">
#[cfg(feature = "test")]
use serde::{Deserialize, Deserializer, Serialize};

#[derive(Debug)]
#[cfg_attr(feature = "test", derive(PartialEq, Serialize))]
pub struct UserEmail(String);

#[cfg(feature = "test")]
impl<'de> Deserialize<'de> for UserEmail {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let email = String::deserialize(deserializer)?;

        UserEmail::new(email).ok_or_else(|| {
            serde::de::Error::custom("`email` is not valid".to_string())
        })
    }
}
</code></pre>

Запуск только помеченных тестов `#[cfg(feature = "test")]`
```
cargo test  --features "test"
```

