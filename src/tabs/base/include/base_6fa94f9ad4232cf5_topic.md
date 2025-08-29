

Как я могу реализовать `Ord`?

Trait `std::cmp::Ord` - Трейт для типов, образующих общий порядок
<pre><code class="language-rust no_run edition2021">
pub trait Ord: Eq + PartialOrd<Self> {
    // Required method
    fn cmp(&self, other: &Self) -> Ordering;

    // Provided methods
    fn max(self, other: Self) -> Self
       where Self: Sized { ... }
    fn min(self, other: Self) -> Self
       where Self: Sized { ... }
    fn clamp(self, min: Self, max: Self) -> Self
       where Self: Sized + PartialOrd<Self> { ... }
}
</code></pre>
