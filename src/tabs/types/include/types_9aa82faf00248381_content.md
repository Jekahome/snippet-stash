


<pre><code class="language-rust">
lazy_static! {
    static ref S1: &'static str = "a";
    static ref S2: &'static str = "b";
}
lazy_static! {
    static ref S3: String = [*S1, *S2].join("");
}
</code></pre>
