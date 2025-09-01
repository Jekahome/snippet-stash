


<pre><code class="language-rust">
struct Filter<I, F> {
    iter: I,
    predicate: F,
}
impl<I, F> Iterator for Filter<I, F>
where
  I: Iterator,
  F: FnMut(&I::Item) -> bool {
    type Item = I::Item;
    fn next(&mut self) -> Option<Self::Item> {
        while let Some(item) = self.iter.next() {
            if (self.predicate)(&item) { return Some(item); }
        }
        None
    }
}
fn filter<I, F>(iter: I, predicate: F) -> impl Iterator<Item = I::Item>
where
    I: IntoIterator,
    F: FnMut(&I::Item) -> bool {
    Filter {
        iter: iter.into_iter(),
        predicate,
    }
}
fn main() {
    let even_numbers = filter(0..10, |n| n % 2 == 0);
    for number in even_numbers { println!("{}", number);}
}
</code></pre>
