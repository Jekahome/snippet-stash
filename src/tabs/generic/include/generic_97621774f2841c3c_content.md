

Вам нужно тщательно проектировать блоки `impl`, чтобы реализация всегда могла быть выведена из контекста. 
Ключевое наблюдение заключается в том, что параметр неявного признака представляет собой кортеж параметров функции. 
Поэтому функции заданного типа всегда имеют уникальный неявный параметр, в отличие от случая, когда у Cat есть два возможных неявных параметра (Loud и Quiet)
<pre><code class="language-rust">
trait Noise<M> {
    fn make_noise(&self, args: M);
}
impl<T0, F> Noise<(T0,)> for F where F: Fn(T0) {
    fn make_noise(&self, args: (T0,)) {
        self(args.0);
    }
}
impl<T0, T1, F> Noise<(T0, T1,)> for F where F: Fn(T0, T1) {
    fn make_noise(&self, args: (T0, T1)) {
        self(args.0, args.1);
    }
}
fn main() {
    let dog = |n: usize| { println!("{}", "BARK".repeat(n)); };
    dog.make_noise((3,)); // BARKBARKBARK

    let cat = |n: usize, sound: &str| { println!("{}", sound.repeat(n)); };
    cat.make_noise((2, "MEOW"));
}
</code></pre>
