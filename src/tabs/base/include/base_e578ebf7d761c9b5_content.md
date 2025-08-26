


<pre><code class="language-rust">
fn apply<F>(f: &mut F, arg: i32)  -> i32
where
    F: FnMut(i32) -> i32,
{
    f(arg)
}

fn main() {
    let mut some_var = 8;
    let mut closure =|x| {some_var+=1;x+some_var};
    assert_eq!(14, apply(&mut closure, 5));
    assert_eq!(15, apply(&mut closure, 5));
}
</code></pre>
