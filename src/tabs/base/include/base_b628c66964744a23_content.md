


<pre><code class="language-rust">
use std::convert::AsMut;
struct Child{
    data:Vec< i32>
}
struct Base{
    child:Child
}
impl AsRef< Child> for Base {
    #[inline]
    fn as_ref(&self) -> &Child { // as_ref Выполняет преобразование.
        &self.child
    }
}
impl AsMut< Child> for Base {
    #[inline]
    fn as_mut(&mut self) -> &mut Child { // as_mut Выполняет преобразование.
        &mut self.child
    }
}
fn main() {
    let c = Child{data:vec![1,2,3]};
    let mut base = Base{child:c};
    let link:&Child = base.as_ref();
    assert_eq!(link.data,[1,2,3]);

    let mut_link:&mut Child = base.as_mut();
    if let Some(el) = (*mut_link.data).get_mut(0){
        *el = 2;
    }
    assert_eq!(mut_link.data,[2,2,3]);
}
</code></pre>
