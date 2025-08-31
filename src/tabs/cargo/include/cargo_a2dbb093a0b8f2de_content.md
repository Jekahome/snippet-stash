

Некоторые пакеты требуют компиляции стороннего кода, отличного от `Rust`, например библиотеки `C`.
Cargo скомпилирует `build.rs` скрипт и выполнит его непосредственно перед сборкой пакета.

Некоторые примеры использования скриптов сборки:
* Создание связанной библиотеки `C`.
* Поиск библиотеки `C` в хост-системе.
* Создание модуля `Rust` из спецификации.
* Выполнение любой конфигурации для конкретной платформы, необходимой для ящика.

---

Cargo.toml:
```toml
[package]
name = "secure_code"
version = "0.1.0"
edition = "2021"
build = "build.rs"
```

File /build.rs:
<pre><code class="language-rust">
use std::env;
use std::process::Stdio;
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut child = std::process::Command::new("sh")
      .arg("db/setup_db.sh")
      .stderr(Stdio::piped())
      .spawn()
      .unwrap();
    child.wait().unwrap();
   Ok(())
}
</code></pre>

---

`build.rs` для `gRPC`:
<pre><code class="language-rust">
use std::env;
use std::path::PathBuf;

fn main() -> Result<(), Box<dyn std::error::Error>> {
   let proto_file = "./proto/store.proto";
   let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());

   tonic_build::configure()
           .protoc_arg("--experimental_allow_proto3_optional") // for older systems
           .build_client(true)
           .build_server(true)
           .file_descriptor_set_path(out_dir.join("store_descriptor.bin"))
           .out_dir("./src")
           .compile(&[proto_file], &["proto"])?;

   Ok(())
}
</code></pre>
