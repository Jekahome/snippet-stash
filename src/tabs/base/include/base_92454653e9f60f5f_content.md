


<pre><code class="language-rust">
#![feature(concat_idents)]

fn foobar() -> u32 { concat_idents!(foo, bar2)() }
fn foobar2() -> u32 { 23 }

fn main() {
    if concat_idents!(foo, bar)() > 20 {
       assert!(true);
    }else{
        assert!(false);
    }
}
</code></pre>
