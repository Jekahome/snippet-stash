


<pre><code class="language-rust">
use std::ops::AddAssign;
#[derive(Debug)]
struct Count { 
    value: i32,
}
impl AddAssign for Count {
    fn add_assign(&mut self, other: Count) {
        self.value += other.value;
    }
}
fn main() {
    let mut c1 = Count { value: 1 };
    let c2 = Count { value: 5 };
    c1 += c2;
    println!("{:?}", c1);// Это напечатает Count { value: 6 }.
}
</code></pre>
