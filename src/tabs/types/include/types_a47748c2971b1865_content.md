


<pre><code class="language-rust">
// У `dyn T` типов тоже есть lifetime:

type Callback<'a> = Box<dyn Fn() + 'a>;

fn main() {
    let f: Callback<'static> = Box::new(|| println!("hello")); // может жить сколько угодно пока мы его не деаллокацируем

    let x = 92;
    let g: Callback<'_> =
    Box::new(|| println!("x = {}", x));// тут x захватывается по ссылке так как нет ключевого слова move значит x имеит ifetime соответствующий локальной переменной x
}
</code></pre>

---

<pre><code class="language-rust">
Box<dyn T> == Box<dyn T + 'static>
&'a dyn T == &'a (dyn T + 'a)
dyn T == dyn T +'static
</code></pre>
