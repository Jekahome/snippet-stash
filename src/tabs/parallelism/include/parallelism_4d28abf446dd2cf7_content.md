


<pre><code class="language-rust">
#![feature(negative_impls)]

struct SpecialThreadToken(u8);

impl !Send for SpecialThreadToken {}
impl !Sync for SpecialThreadToken {}
</code></pre>
