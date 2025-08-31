


<pre><code class="language-rust">
macro_rules! foo {
    ($v:ident) => (let $v = 3; );
}

fn main() {
    foo!(x);
    println!("{}", x);
}

macro_rules! foo {
    () => (fn x() {print!("ffff") });
}

fn main() {
    foo!();
    x();
}

</code></pre>
