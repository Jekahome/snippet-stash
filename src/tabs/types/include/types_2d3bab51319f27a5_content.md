


<pre><code class="language-rust">
fn main() {
    let a = (8,);
    let b = (8);

    print_type_of(&a);// (i32,) => вот кортеж
    print_type_of(&b);// i32    => просто i32
}
fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}
</code></pre>
