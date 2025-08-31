

Стандартная библиотека Rust (std) компилируется только для нескольких архитектур. Итак, чтобы скомпилировать другие архитектуры (которые поддерживает LLVM), программы Rust могут отказаться от использования всего std и вместо этого использовать только переносное подмножество, известное как The Core Library (core).
<pre><code class="language-rust">
#![feature(start, libc, lang_items)]
#![no_std]
#![no_main]

// The libc crate allows importing functions from C.
extern crate libc;

// A list of C functions that are being imported
extern {
    pub fn printf(format: *const u8, ...) -> i32;
}

#[no_mangle]
// The main function, with its input arguments ignored, and an exit status is returned
pub extern fn main(_nargs: i32, _args: *const *const u8) -> i32 {
    // Print "Hello, World" to stdout using printf
    unsafe { 
        printf(b"Hello, World!\n" as *const u8);
    }

    // Exit with a return status of 0.
    0
}

#[lang = "eh_personality"] extern fn eh_personality() {}
#[lang = "panic_fmt"] extern fn panic_fmt() -> ! { panic!() }
</code></pre>
