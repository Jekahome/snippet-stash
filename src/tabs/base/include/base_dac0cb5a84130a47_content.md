


<pre><code class="language-rust">
pub trait Copy: Clone {} // если хочешь Copy то твой тип должен еще и Clone реализовать

pub trait Clone {
    # [must_use = "клонирование часто обходится дорого и не вызывает побочных эффектов"]
    pub fn clone (& self) -> Self;

    pub fn clone_from (&mut self, source: & Self) {...}
}
</code></pre>
