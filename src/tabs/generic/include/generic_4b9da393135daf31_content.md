


<pre><code class="language-rust">
// Примеры использования общих параметров const.

// Используется в подписи самого предмета.
fn foo<const N: usize>(arr: [i32; N]) {
    // Используется как тип в теле функции.
    let x: [i32; N];
    // Используется как выражение.
    println!("{}", N * 2);
}

// Используется как поле структуры.
struct Foo<const N: usize>([i32; N]);

impl<const N: usize> Foo<N> {
    // Используется как связанная константа
    const CONST: usize = N * 4;
}

trait Trait {
    type Output;
}

impl<const N: usize> Trait for Foo<N> {
    // Используется как связанный тип.
    type Output = [i32; N];
}
fn main() {
    let foo = Foo([1,2]);
    assert_eq!(8,Foo::<2>::CONST);
    print!("{:?}", Foo::<2>::CONST);
}
</code></pre>
