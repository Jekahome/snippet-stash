

* примитивные типы Rust usize и isize имеют такое же представление, как типы C size_t и ptrdiff_t ;

* указатели C и C++ и ссылки C++ соответствуют типам простых указателей Rust, *mut T и *const T ;
<pre><code class="language-rust">
use std::os::raw::c_char;
extern {
         fn strlen(s: *const c_char) -> usize;
}
</code></pre>


Имея такой блок extern, мы можем вызывать strlen, как любую другую функцию Rust, хотя тип выдает в ней туриста:
<pre><code class="language-rust">
use std::ffi::CString;
let rust_str = "I'll be back";
let null_terminated = CString::new(rust_str).unwrap();
unsafe {
         assert_eq!(strlen(null_terminated.as_ptr()), 12);
}
</code></pre>
