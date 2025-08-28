


<pre><code class="language-rust">
struct Foo<'a> {
    x: &'a i32,
}
impl<'a> Foo<'a> {
    fn x(&self) -> &'a i32 { self.x }
}
struct Foo2<'a,T:'a> {
    x: &'a T,
}
</code></pre>


Цель состоит в том, что базовые данные действительны только для жизни `'a`, поэтому Slice не должны переживать `'a`.

Однако это намерение не выражено в коде, поскольку нет использования времени жизни, `'a`, следовательно, неясно, к каким данным оно относится.

Мы можем исправить это, указав компилятору, чтобы действовать, как если Slice структура содержит ссылку `&'a T` с помощью PhantomData
<pre><code class="language-rust">
use std::marker::PhantomData;
struct Foo3<'a, T: 'a> {
    start: *const T,
    end: *const T,
    phantom: PhantomData<&'a T>
}
fn main() {
    let x = &5; // то же самое, что и `let _y = 5; let y = &_y;`
    let f = Foo { x };
    println!("{}", f.x);

    let x:&i32 = &6;
    let x:&&str = &"str";
    let x:&Vec<i32>= &vec![1,2,3];
    let f = Foo2{ x };
    println!("{:?}", f.x);

    let vec = vec![1,2,3];
    let ptr = vec.as_ptr();
    Foo3 {
        start: ptr,
        end: unsafe { ptr.offset(vec.len() as isize) },
        phantom: PhantomData,
    };
}
</code></pre>
