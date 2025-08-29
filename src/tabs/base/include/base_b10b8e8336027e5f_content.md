

`#[cfg_attr]`

Когда предикат конфигурации истинен, этот атрибут расширяется до атрибутов, перечисленных после предиката. 
Например, следующий модуль будет либо найден в целевом объекте, linux.rs либо windows.rs основан на нем.
<pre><code class="language-rust">
#[cfg_attr(target_os = "linux", path = "linux.rs")]
#[cfg_attr(windows, path = "windows.rs")]
mod os;

Могут быть указаны ноль, один или несколько атрибутов. Каждый из нескольких атрибутов будет преобразован в отдельные атрибуты. Например:
#[cfg_attr(feature = "magic", sparkles, crackles)]
fn bewitched() {}

// Когда включен флаг функции `magic`, приведенное выше будет расширяться до:
#[sparkles]
#[crackles]
fn bewitched() {}
</code></pre>

--- 

`#[cfg]`

Если предикат истинен, вещь переписывается так, чтобы на ней не было cfg атрибута. Если предикат ложен, вещь удаляется из исходного кода.
<pre><code class="language-rust">
#[cfg(target_os = "macos")]
fn macos_only() {
  // ...
}

// макрос cfg!: cfg!(...), который можно использовать в условных выражениях
if cfg!(target_os = "linux") {
    println!("Да. Это точно linux!");
} else {
    println!("Да. Это точно *не* linux!");
}
</code></pre>

---- 

Пример, компиляция исходника в зависимости от аттрибута

```toml
Cargo.toml:
[features]
qa_build = []
```

<pre><code class="language-rust">
extern crate qa_ex;

#[cfg(feature = "qa_build")]
use  qa_ex::something;

#[cfg(not(feature = "qa_build"))]
fn something(){
    println!("NOT");
}
fn main() {
    something();
} 
</code></pre>

```bash
cargo build
./target/release/example # NOT

cargo build  --features qa_build
./target/release/example # вариант из crate
```




