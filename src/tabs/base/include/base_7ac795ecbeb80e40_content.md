

<pre><code class="language-rust">
const fn copy_and_double<T: Copy>(x: T, y: T) -> (T, T) {
    (x, y)
}
fn main() {
    const PAIR: (i32, i32) = copy_and_double(5, 10);
    println!("{:?}", PAIR); // Выводит (5, 10)
}
</code></pre>

--- 
<pre><code class="language-rust">
const fn create_dyn_trait() -> &'static dyn MyTrait {
    &MyStruct(42) as &dyn MyTrait
}
fn main() {
    let obj = create_dyn_trait();
    println!("{}", obj.value()); // Выводит 42
}
</code></pre>

--- 
<pre><code class="language-rust">
const fn get_closure() -> impl Fn(i32) -> i32 {
    |x| x * 2
}
fn main() {
    let closure = get_closure();
    println!("{}", closure(5)); // Выводит 10
}
</code></pre>
