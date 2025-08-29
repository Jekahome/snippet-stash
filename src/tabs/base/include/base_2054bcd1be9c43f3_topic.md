

Trait `std::cmp::PartialEq` - отношение частичной эквивалентности

Как я могу сравнить два разных типа?

<pre><code class="language-rust no_run edition2021">
pub trait PartialEq<Rhs = Self>
where
    Rhs: ?Sized,
{
    // Required method
    fn eq(&self, other: &Rhs) -> bool;

    // Provided method
    fn ne(&self, other: &Rhs) -> bool { ... }
}

</code></pre>


 




