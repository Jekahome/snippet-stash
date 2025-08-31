


<pre><code class="language-rust">
// Они позволяют определять типы обобщенных типов, времени жизни или константы для связанных типов.

struct WindowsMut<'t, T> {
    slice: &'t mut [T],
    start: usize,
    window_size: usize,
}
impl<'t, T> LendingIterator for WindowsMut<'t, T> {
    type Item<'a> where Self: 'a = &'a mut [T]; // <----- GAT

    fn next<'a>(&'a mut self) -> Option<Self::Item<'a>> {
        let retval = self.slice[self.start..].get_mut(..self.window_size)?;
        self.start += 1;
        Some(retval)
    }
}
</code></pre>

---

<pre><code class="language-rust">
trait PointerFamily {
    type Pointer<T>: Deref<Target = T>; // <----- GAT

    fn new<T>(value: T) -> Self::Pointer<T>;
}

struct ArcFamily;
struct RcFamily;

impl PointerFamily for ArcFamily {
    type Pointer<T> = Arc<T>;
    ...
}
impl PointerFamily for RcFamily {
    type Pointer<T> = Rc<T>;
    ...
}

struct MyStruct<P: PointerFamily> {
    pointer: P::Pointer<String>,
}
</code></pre>
