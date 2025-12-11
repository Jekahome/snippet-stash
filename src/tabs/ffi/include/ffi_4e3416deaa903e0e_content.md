


**Типы**

На стороне Rust если есть выбор то, есть модуль **std::os::raw**, который определяет базовые C-подобные типы для FFI. Использование std::os::raw::{c_int, c_long, c_char, c_void} гарантирует, что Rust будет использовать тот же размер и представление, что и int в C на той же платформе.

А если есть выбор какой тип данных использовать в языке C то лучше использовать типы из библиотеки stdint.h, например uint32_t, int64_t и т.д., мы точно знаем размер типа: 32 бита, 64 бита и т.п.


**crate libc** нужен не для базовых типов которые есть в std::os::raw, а для большего покрытия C API и системных констант
* Структуры и типы, которых нет в std::os::raw
* Константы и макросы C
* Системные функции (libc даёт почти все POSIX/Unix функции: mmap, open, read, write, fork, getpid и т.д)

**crate bindgen** инструмент, который автоматически генерирует Rust FFI-код на основе C-заголовков (.h). Используется в build.rs
 

[Выравнивание структуры #[repr(C)]](https://doc.rust-lang.org/reference/type-layout.html#the-c-representation)

Для строк [alloc::ffi::CString](https://doc.rust-lang.org/alloc/ffi/struct.CString.html) и [alloc::ffi::CStr](https://doc.rust-lang.org/core/ffi/struct.CStr.html)

