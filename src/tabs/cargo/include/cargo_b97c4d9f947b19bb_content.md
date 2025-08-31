

```
[package]
name = "social_backend"
version = "0.1.0-dev"
edition = "2018"
description = "Backend part of social platform project."
authors = ["Instrumentisto Team <developer@instrumentisto.com>"]
readme = "README.md"
repository = "https://git.instrumentisto.com/social/backend"
publish = false

[dependencies]
postgres_macros = "0.1" // из ветки master залитой на crates.io
postgres_macros = { path = "../postgres_macros-0.1.13"} // из своей папки
postgres_macros = { git = "https://github.com/sfackler/rust-postgres-macros.git", rev = "7d4cc509e5c96e062ba494ecd7fde020a5e91a21" } // из ветки master определенного commit

[dependencies.postgres_macros]   // из ветки release определенного commit
  git="https://github.com/sfackler/rust-postgres-macros.git"
   branch = "release"
   version = "0.1.12"
   rev = "fbe8fb80cb5e5873b611b6203c56a2d8279f6296"

[dev-dependencies]
# Dev-зависимости не используются при компиляции пакета для сборки, но используются для компиляции тестов, примеров и тестов производительности.
```
