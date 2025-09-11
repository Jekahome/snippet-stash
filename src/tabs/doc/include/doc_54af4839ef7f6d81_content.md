

**Документирование на уровне модуля**

Так  `#![deny(missing_docs)]` говорит что модуль должен быть документирован. 

Добавив теги условной компиляции `#![deny(missing_docs)]` в самое начало файла и в случае его не соблюдения т.е. если не напишем документацию уровня модуля  - **компиляции не будет**.
```rust
#![deny(missing_docs)]

//! # My Awesome Crate
//!
//! A comprehensive library for solving problems.
//!
//! ## Getting Started
//!
//! Add to your `Cargo.toml`:
//! &#96;&#96;&#96;toml
//! [dependencies]
//! my-crate = "0.1"
//! &#96;&#96;&#96;
//!
//! ## Modules
//!
//! - [`math`] - Mathematical utilities
//! - [`net`] - Networking functionality
//! - [`data`] - Data processing tools

pub mod math;
pub mod net;
pub mod data;
fn main(){}
```



**Документирование на уровне метода**
```rust
/// Async HTTP client
///
/// Requires the `async` feature:
/// &#96;&#96;&#96;toml
/// [dependencies]
/// my-crate = { version = "0.1", features = ["async"] }
/// &#96;&#96;&#96;
///
/// # Examples
///
/// &#96;&#96;&#96;rust
/// # #[cfg(feature = "async")]
/// # async fn example() {
/// use my_crate::AsyncClient;
///
/// let client = AsyncClient::new();
/// let response = client.get("https://example.com").await.unwrap();
/// # }
/// &#96;&#96;&#96;
#[cfg(feature = "async")]
pub struct AsyncClient { /* ... */ }
fn main(){}
```
