


<pre><code class="language-rust no_run edition2021">
// Классическая C-структура
struct Point { x: f64, y: f64 }

// tuple struct
struct Point(f64, f64);

// newtype (tuple) struct
struct Point1D(f64);

// unit struct
struct ThePoint; // ZST
</code></pre>
