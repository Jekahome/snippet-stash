


<pre><code class="language-rust">
 fn function<F>(f: F) where for<'a> F: FnOnce(&'a Type)

 struct Struct<F> where for<'a> F: FnOnce(&'a Type) { x: F }

 enum Enum<F> where for<'a> F: FnOnce(&'a Type) { Variant(F) }

 impl<F> Struct<F> where for<'a> F: FnOnce(&'a Type) { fn x(&self) -> &F { &self.x } }

 fn foo<'a, T>(s:&'a str) {}

 trait A<U> {}

 struct Ref<'a, T> where T: 'a { r: &'a T }

 struct InnerArray<T, const N: usize>([T; N]);

 struct EitherOrderWorks<const N: bool, U>(U);
</code></pre>
