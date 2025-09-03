


<pre><code class="language-rust">
struct Store<'l>{
    data:Vec<Cow<'l,Value>>
}
impl<'b> Store<'b>{
    fn new()->Self{
        Self{data:vec![]}
    }
    fn add(&mut self,s:Cow<'b,Value>){
        self.data.push(s);
    }
}

#[derive(Debug,Clone)]
struct Value(String);

use std::convert::From;
impl<'a> From<&'a Value> for Cow<'a, Value> {
    fn from(a: &'a Value) -> Self {
        Cow::Borrowed(a)
    }
}
fn main() {
    let v = Value(String::from("hello"));
    let mut store = Store::new();
    store.add(Cow::Borrowed(&v));
    store.add((&v).into());
    {
        let v = Value(String::from("hello2"));
        store.add(Cow::Owned(v));
    }
    println!("{:?}",store.data);
}
</code></pre>
