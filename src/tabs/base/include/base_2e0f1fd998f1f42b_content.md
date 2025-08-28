


<pre><code class="language-rust">
use std::convert::From;
#[derive(Debug)]
struct Number {
    value: i64
}
impl From<i64> for Number {
    fn from(item: i64) -> Self {
        Number { value: item }
    }
}
fn main() {
    let num = Number::from(30);
    //let num = Number{value:30};
    println!("My number is {:?}", num);

    let int = 5;
    let num: Number = int.into();
    println!("My number is {:?}", num);
}
</code></pre>
