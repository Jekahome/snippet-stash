

выводит текст кода на экран 
 
<pre><code class="language-rust">
use quux::{quux_1, quux_2};
use set_example::check_value;
fn main() {
    let mut y = 2;
    {
        let x = || { 7 + y };
        let retval = quux_1(&x);
        { ::std::io::_print(format_args!("retval: {0:?}\n", retval)); };
        let retval = quux_2(x());
        { ::std::io::_print(format_args!("retval: {0:?}\n", retval)); };
    }
    y = 5;
    { ::std::io::_print(format_args!("y     : {0:?}\n", y)); };
    let mut loop_count = 0;
    let p1 = 1;
    loop {
        let p2 = "hello";
        check_value(p1, p2);
        loop_count += 1;
        if loop_count > 2 { break; }
    }
}
</code></pre>

`cargo +nightly rustc --profile=check -- -Zunpretty=expanded`
