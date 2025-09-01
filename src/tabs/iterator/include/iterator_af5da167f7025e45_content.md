


<pre><code class="language-rust">
use std::iter::FromIterator;
#[derive(Debug)]
struct MyCollection(Vec<i32>);

impl MyCollection {
    fn new() -> MyCollection {
        MyCollection(Vec::new())
    }
    fn add(&mut self, elem: i32) {
        self.0.push(elem);
    }
}
impl FromIterator<i32> for MyCollection {
    fn from_iter<I: IntoIterator<Item=i32>>(iter: I) -> Self {
        let mut c = MyCollection::new();
        for i in iter {
            c.add(i);
        }
        c
    }
}
fn main(){
    let iter = (0..5).into_iter();
    let c: MyCollection = iter.collect();
    assert_eq!(c.0, vec![0, 1, 2, 3, 4]);
    //-----------------------------------------------------
    let iter = (0..5).into_iter();
    let c = MyCollection::from_iter(iter);
    assert_eq!(c.0, vec![0, 1, 2, 3, 4]);
    //-----------------------------------------------------
   // Result реализуется FromIterator, поэтому collect() должен работать.
   // При первом обнаружении Errварианта он возвращает этот вариант и прекращает сбор.

    let results = [Ok(1), Err("nope"), Ok(3), Err("bad")];
    let result: Result<Vec<_>, &str> = results.iter().cloned().collect();
    // дает нам первую ошибку
    assert_eq!(Err("nope"), result);
    let results = [Ok(1), Ok(3)];
    let result: Result<Vec<_>, &str> = results.iter().cloned().collect();
    // дает нам список ответов
    assert_eq!(Ok(vec![1, 3]), result);
}
</code></pre>
