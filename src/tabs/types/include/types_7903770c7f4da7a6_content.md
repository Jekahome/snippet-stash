


<pre><code class="language-rust">
trait A {
  fn a(&self);
}
trait B: A {
  fn b(&self);
}
impl B for Spam {
  fn b(&self) {}
}
impl A for Spam {
  fn a(&self) {
    self.b(); // вызываем метод B!
  }
}
</code></pre>

---

<pre><code class="language-rust">
 trait Fn<Args>: FnMut<Args> ....
// тут Fn - это Subtrait, а FnMut - Supertrait
</code></pre>
