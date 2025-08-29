



Цель состоит в том, что базовые данные действительны только для жизни `'a`, поэтому Slice не должны переживать 'a.
Однако это намерение не выражено в коде, поскольку нет использования времени жизни, `'a`, следовательно, неясно, к каким данным оно относится.
Мы можем исправить это, указав компилятор, чтобы действовать, как если Slice структура содержит ссылку `&'a T` 
<pre><code class="language-rust">
use std::marker::PhantomData;
struct Foo3<'a, T: 'a> {
    start: *const T,
    end: *const T,
    phantom: PhantomData<&'a T>,
}
fn main(){
 let vec = vec![1,2,3];
 let ptr = vec.as_ptr();
 Foo3 {
    start: ptr,
    end: unsafe { ptr.offset(vec.len() as isize) },
    phantom: PhantomData,
 };
}
</code></pre>
