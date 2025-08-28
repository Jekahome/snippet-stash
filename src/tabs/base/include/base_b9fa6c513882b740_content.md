


<pre><code class="language-rust">
#[derive(Debug, Default)]
struct GenericStruct<T> {
    value: T,
}

fn main() {
    // Инициализация структуры с использованием значения по умолчанию для типового параметра i32
    let gs: GenericStruct<i32> = Default::default();
    println!("{:?}", gs);
}
</code></pre>
