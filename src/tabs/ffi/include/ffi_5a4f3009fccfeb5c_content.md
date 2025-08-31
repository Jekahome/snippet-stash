

Crate libc - необработанные привязки FFI к системным библиотекам платформ
<pre><code class="language-rust">
#![feature(libc)]
extern crate libc;
use libc::pid_t;

#[link(name = "c")]
extern {
    fn getpid() -> pid_t;
}

fn main() {
    let x = unsafe { getpid() };
    println!("Process PID is {}", x);
}
</code></pre>
