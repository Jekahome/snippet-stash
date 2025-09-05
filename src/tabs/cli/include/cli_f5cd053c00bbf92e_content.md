


<pre><code class="language-rust">
use std::env;
fn main(){
    for (i,argument) in env::args_os().enumerate() {
        println!("{}: {:?}",i, argument);
    }
    // 0: "target/debug/test2"
    // 1: "param"
}
</code></pre>

Запуск:
```
$ cargo run --bin test2 param
```

---
 
<pre><code class="language-rust">
fn main(){
    if env::args_os().len() >1 {
        let hundred = env::args_os().enumerate().collect::<Vec<(usize, std::ffi::OsString)>>();
        let (_,ref  value) = hundred[1];
        if let Some(n) = value.to_str(){
            println!("{}",n);
        }
    }else{...}
}
</code></pre>
