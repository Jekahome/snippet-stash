



Этот объект не требует создания кучи в отличии от format!, write!, println! и т.д., и он ссылается только на информацию о стеке.
Цель этого макроса состоит в том, чтобы еще больше предотвратить промежуточные выделения при работе со строками форматирования.
<pre><code class="language-rust">
use std::fmt;
use std::io::{self, Write};
fn main(){
 let mut some_writer = io::stdout();
 write!(&mut some_writer, "{}", format_args!("print with a {}", "macro"));
}
</code></pre>

---
<pre><code class="language-rust">
use std::fmt;
use std::io::{self, Write};
fn main(){
 let  display  =  format ! ( "{:?}" , format_args! ( "{} foo {:?}" , 1 , 2 ));
 let  debug  =  format ! ( "{}" , format_args! ( "{} foo {:?}" , 1 , 2 ));
 println!("{} \n {}",display,debug);
}
</code></pre>
 
---
<pre><code class="language-rust">
fn main(){
    fn my_fmt_fn(args: fmt::Arguments) {
        write!(&mut io::stdout(), "{}", args);
    }
    my_fmt_fn(format_args!(", or a {} too", "function"));
}
</code></pre>
    
---
<pre><code class="language-rust">
 use std::fmt::Write;
 struct A(i32);
 impl std::fmt::Display for A {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        write!(f, "A({})", self.0)
    }
 }
 fn main() {
    let a = A(1);
    let mut buf = String::new();
    buf.write_fmt(format_args!("{}", a)).expect("Display returned an error unexpectedly");
    buf.shrink_to_fit();
    println!("{}",buf);// A(1)
 }
</code></pre>

--- 

<pre><code class="language-rust">
/// Log an error including code location, with `format!`-like arguments.
/// Real code would probably use the `log` crate.
macro_rules! my_log {
    { $($arg:tt)+ } => {
        eprintln!("{}:{}: {}", file!(), line!(), format_args!($($arg)+));
    }
}

let x = 10u8;
// Format specifiers:
// - `x` says print as hex
// - `#` says prefix with '0x'
// - `04` says add leading zeroes so width is at least 4
//   (this includes the '0x' prefix).
my_log!("x = {:#04x}", x);
</code></pre>





