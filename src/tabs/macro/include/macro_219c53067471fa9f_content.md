


<pre><code class="language-rust">
macro_rules! example {
    ($(I $i:ident)* E $e:expr) => { ($($i)-*) * $e };
}

fn main(){
    let foo = 2;
    let bar = 3;
    // The following expands to `(foo - bar) * 5`
    example!(I foo I bar E 5);
}
</code></pre>
