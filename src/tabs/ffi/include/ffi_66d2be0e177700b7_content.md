


Устранение несоответствия ABI C
<pre><code class="language-rust no_run edition2021">
#![feature(repr_transparent)]

#[repr(transparent)]
struct Grams(f64);

#[repr(transparent)]
struct Millimeters(f64);
</code></pre>
