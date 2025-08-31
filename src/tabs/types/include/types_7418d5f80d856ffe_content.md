


<pre><code class="language-rust">
// Rust также позволяет указывать типы, которые не занимают места:

struct Nothing; // No fields = no size

// All fields have no size = no size
struct LotsOfNothing {
    foo: Nothing,
    qux: (),      // empty tuple has no size
    baz: [u8; 0], // empty array has no size
}
</code></pre>
