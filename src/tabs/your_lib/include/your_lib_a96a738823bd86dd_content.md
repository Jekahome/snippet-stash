

По умолчанию используется имя файла src/lib.rs, а имя библиотеки по умолчанию - имя пакета.
 
**Создание**
```
$ cargo new hello_world --lib --vcs none
```

File Cargo.toml:
```toml
[package]
name = "hello_world"
version = "0.1.0"
authors = ["jeka <yaroshjeka@gmail.com>"]
edition = "2018"

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
[lib]
name = "hello_world"
path = "src/lib.rs"
crate-type = ["lib"]
```


File src/lib.rs:
<pre><code class="language-rust">
pub fn sum(a:i32,b:i32,mess:&str)->i32{
    let result = a+b;
    println!("{}: {}+{}={}",mess,a,b,result);
    result
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
            assert_eq!(2 + 2, 4);
    }
}
// Для использования самой библиотеки в качестве программы
// создать файл main.rs
fn main() {
    hello_world::sum(1,4,"Hello, world!");
}
</code></pre>
 

**Сборка**

Сборка для данной архитектуры. По умолчанию используется хост-архитектура. 

```
$ cargo build --lib
```

```
для crate-type = ["lib"]
 \hello_world\target\debug\hello_world.d  
 \hello_world\target\debug\hello_world.rlib
для crate-type = ["dylib"]
  \hello_world\target\debug\hello_world.d 
  \hello_world\target\debug\hello_world.dll 
  \hello_world\target\debug\hello_world.exp 
  \hello_world\target\debug\hello_world.lib
  \hello_world\target\debug\hello_world.pdb 
```

**Подключение**

В другом проекте 

Файл Cargo.toml:
```toml
[dependencies]
hello_world = { path = "../test_lib/hello_world" } # путь к папке библиотеки
```

Файл main.rs:
<pre><code class="language-rust">
extern crate hello_world;
use hello_world::sum;
fn main() {
     sum(1,2,"Hello, world!");
}
</code></pre>




