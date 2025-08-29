


<pre><code class="language-rust">
use std::borrow::{Borrow, Cow};
use std::fmt::Debug;
use std::ops::Deref;

trait MyTrait: Debug {
    fn data(&self) -> &str;
}

#[derive(Debug)]
struct MyString {
    data: String
}
impl MyTrait for MyString {
    fn data(&self) -> &str {
        &self.data
    }
}
impl<'a> Borrow<dyn MyTrait + 'a> for MyString {
    fn borrow(&self) -> &(dyn MyTrait + 'a) {
        self
    }
}
impl ToOwned for dyn MyTrait {
    type Owned = MyString;

    fn to_owned(&self) -> MyString {
        MyString {
            data: self.data().to_owned()
        }
    }
}
fn main()  {
    let data = MyString { data: "Hello world".to_owned() };

    let borrowed_cow: Cow<'_, dyn MyTrait> = Cow::Borrowed(&data);
    println!("{:?}", borrowed_cow);

    let owned_cow: Cow<'_, dyn MyTrait> = Cow::Owned(data);
    println!("{:?}", owned_cow);
   // --------------------------------------------------------------------------
    let data = MyString { data: "Hello world".to_owned() };
    let cow1: Cow<'_, dyn MyTrait> = Cow::Borrowed(&data);

    let data = MyString { data: "Hello world".to_owned() };
    let cow2: Cow<'_, dyn MyTrait> = Cow::Owned(data);

    let mut vector: Vec<Cow<'_, dyn MyTrait>> = vec![cow1, cow2];
}
</code></pre>
