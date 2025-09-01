


<pre><code class="language-rust">
use std::iter::Peekable;
struct InefficientChunks<I> where I: Iterator {
    iter: Peekable<I>,
    size: usize,
}
impl<I> Iterator for InefficientChunks<I> where I: Iterator {
    type Item = Vec<I::Item>;
    fn next(&mut self) -> Option<Self::Item> {
        if self.iter.peek().is_some() {
            Some(self.iter.by_ref().take(self.size).collect())
        } else {
            None
        }
    }
}
trait Awesome: Iterator + Sized {
    fn inefficient_chunks(self, size: usize) -> InefficientChunks<Self> {
        InefficientChunks {
            iter: self.peekable(),
            size: size,
        }
    }
}
impl<I> Awesome for I where I: Iterator {}

fn main() {
    for chunk in (1..100).inefficient_chunks(5) {
        println!("{:?}", chunk);
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
  let xs = [1, 2, 3];
  let mut iter = xs.iter().peekable();
  // peek() lets us see into the future
  assert_eq!(iter.peek(), Some(&&1));
  assert_eq!(iter.next(), Some(&1));
}
</code></pre>
