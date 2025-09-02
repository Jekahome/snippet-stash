

<pre><code class="language-rust">
use std::collections::BTreeMap;
#[derive(Eq,Debug)]
struct A(i32);

use std::cmp::Ordering;
// Что бы знать как сортировать ключи
impl Ord for A {
    fn cmp(&self, other: &A) -> Ordering {
        self.0.cmp(&other.0)
    }
}
impl PartialOrd for A {
    fn partial_cmp(&self, other: &A) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}
impl PartialEq for A {
    fn eq(&self, other: &A) -> bool {
        self.0 == other.0
    }
}
fn main(){
    let mut a:BTreeMap<A,&str> = BTreeMap::new();
    a.insert(A(14),"a14");
    a.insert(A(18),"a18");
    a.insert(A(2),"a2");

    println!("{:?}",a);// {A(2): "a2", A(14): "a14", A(18): "a18"}
}
</code></pre>
