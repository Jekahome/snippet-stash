


<pre><code class="language-rust">
// S<10> - При использовании константные границы могут быть предоставлены как примитивные значения.
// S<{5+5}> - Выражения необходимо заключать в фигурные скобки.

struct Foo<const N: usize>([i32; N]);
impl<const N: usize> Foo<N> {
    const CONST: usize = N * 4;
    // .... fn
}
 
fn main() {
    let foo = Foo([1,2]);
    assert_eq!(8,Foo::<2>::CONST);
    print!("{:?}", Foo::<2>::CONST);
}
</code></pre>

---

Так как `[T; 10]` и `[T; 11]` это разные типы массивов то их содержащие структуры потребуют отдельной реализации трейтов и т.д.
что бы упростить это были введены Const generics, теперь это один тип `[T; N]`:
<pre><code class="language-rust">
#[derive(Debug)]                      
struct Buffers<T, const N: usize> {
    array_one: [T; N],
    array_two: [T; N],
}
 
fn main() {
    let buffer_1 = Buffers {
        array_one: [0u8; 3],
        array_two: [0; 3],
    };
 
    let buffer_2 = Buffers {
        array_one: [0i32; 4],
        array_two: [10; 4],
    };
 
    println!("{buffer_1:#?}, {buffer_2:#?}");
}
</code></pre>
