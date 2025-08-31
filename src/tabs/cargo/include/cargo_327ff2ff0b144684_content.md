

 


Файл библиотеки lib.rs:
<pre><code class="language-rust">
//#[cfg(feature = "mydefault")]
//pub use def::*;
pub fn qwerty(){ println!("qwerty");}
#[cfg(feature = "ex_1")]
pub mod bla{
    pub fn boo(){ println!("boo"); }
}
pub mod lala{
    pub fn foo(){ println!("foo");}
}
#[cfg(feature = "mydefault")]
pub mod def{
    pub fn ggg(){ println!("ggg"); }
}
</code></pre>

Cargo.toml:

```toml
[package]
name = "mylib"
version = "0.1.0"
edition = "2018"

[dependencies]

[features]
default = ['mydefault']
ex_1=[]
mydefault = []
```

Для использования различных функций библиотеки `mylib` в своем проекте:

```toml
Cargo.toml:
[dependencies]
mylib = {default-features = false,path="mylib",features=["mydefault","ex_1"]}
```

Файл main.rs:
<pre><code class="language-rust">
use mylib::*;
fn main(){
  qwerty();
  def::ggg();
  lala::foo();
  bla::boo();
}
</code></pre>
