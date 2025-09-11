

Связующая логистика
```
#[link(name = "cffi")] // Необходима внешняя библиотека типа `libcffi.a`
extern "C" {
    // ...
}
```

Или через скрипт сборки, который выдает `cargo:rustc-link-lib` инструкцию `cargo: 2`
```
// File build.rs
fn main() {
    // Необходима внешняя библиотека типа `libcffi.a`
    println!("cargo:rustc-link-lib=cffi");
}

// File build.rs
fn main() {
    // ...

    // из `Cargo.toml`
    let dir = std::env::var("CARGO_MANIFEST_DIR").unwrap();
    // Найдите собственные библиотеки на один каталог выше.
    println!(
        "cargo:rustc-link-search=native={}",
        std::path::Path::new(&dir).join("..").display()
    );
}
```

---

```
// Определение структуры данных C.   
// Изменения здесь должны быть отражены в lib.rs. 
typedef struct {
    uint8_t byte;
    uint32_t integer;
} FfiStruct;


// Аналогичная структура данных Rust. 
// Изменения здесь должны быть отражены в lib.h / lib.c.
#[repr(C)]
pub struct FfiStruct {
    pub byte: u8,
    pub integer: u32,
}
```
