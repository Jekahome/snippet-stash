
dbg! печатает в stderr вместо stdout, поэтому журналы отладки легко отделить от фактического вывода stdout нашей программы.

dbg! печатает переданное ему выражение, а также значение, которое оценивается выражением.

dbg! берет на себя ответственность за свои аргументы и возвращает их, чтобы вы могли использовать их в выражениях

<pre><code class="language-rust">
fn main(){
  let v = vec![1,2,3];
    dbg!(v);
}
</code></pre>

```
[src/main.rs:39] v = [
    1,
    2,
    3,
]
```
---

<pre><code class="language-rust">
fn main(){
 let scale = 2;
 let f = dbg!(30 * scale); // stderr output: [src/main.rs:52] 30 * scale = 60
 print!("{}",f);// 60
}
</code></pre>
