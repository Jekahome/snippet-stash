


<pre><code class="language-rust">
fn main(){
 let uninit;
 while true {
    if condition {
        uninit = 92;
        break;
    }
 }
 pritnln!("{}", uninit);// error не факт что будет итерация в цикле
}
</code></pre>

---
<pre><code class="language-rust">
fn main(){
 let init;
 loop {
    if condition {
        init = 92;
        break;
    }
 }
 pritnln!("{}", init); // ok
}
</code></pre>
