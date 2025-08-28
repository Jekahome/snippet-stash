

Кроме того, приведение deref не работает в универсальных контекстах.
<pre><code class="language-rust">
use std::ops::Deref;
struct SortedVec<T: Ord>(Vec<T>);

impl<T: Ord> SortedVec<T> {
    fn new(mut vec: Vec<T>) -> Self {
        vec.sort();
        SortedVec(vec)
    }
    fn push(&mut self, t: T) {
        self.0.push(t);
        self.0.sort();
    }
}
impl<T: Ord> Deref for SortedVec<T> {
    type Target = Vec<T>;
    fn deref(&self) -> &Vec<T> {
        &self.0
    }
}
// Очевидно, что мы не можем использовать DerefMut<Target = Vec<T>> здесь, иначе любой, кто использует, SortedVec сможет тривиально нарушить отсортированный порядок. 
impl<T: Ord> DerefMut for SortedVec<T> {
    fn deref_mut(&mut self) -> &mut Self::Target { &mut self.0 }
}
fn main() {
    let mut sorted = SortedVec::new(vec![2, 8, 6, 3]);
    sorted.push(1);
    // sorted[0]=2; // с DerefMut нарушить отсортированный порядок
    assert_eq!(&[1,2,3,6,8],sorted.0.as_slice());

    let mut sortedClone:Vec<i32> = sorted.clone();// метода clone нет в реализации SortedVec поэтому сработал Deref который вернул Vec
    sortedClone.push(4);// этот push не от SortedVec
    assert_eq!(&[1,2,3,6,8,4],sortedClone.as_slice());// не отсотрированно

    // p.s. можно обойти этот случай реализовав Clone для SortedVec
}
</code></pre>
