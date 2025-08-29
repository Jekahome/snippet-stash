


<pre><code class="language-rust">
extern crate blake2;
fn main(){
    use std::hash::{Hash, Hasher};
     
    #[derive(Debug,Eq, PartialEq)]
    struct Person {
        id: u32,
        name: String,
        phone: u64,
    }

    impl Hash for Person {
        fn hash<H: Hasher>(&self, state: &mut H) {
            self.id.hash(state);
            self.phone.hash(state);
        }
    }

    impl From<Person> for &'static [u8] {
        fn from(p: Person) -> Self {
           b"1"
        }
    }
     
    let person:Person = Person{id:1u32,name:String::from(""),phone:2u64};
    let mut hasher = Blake2b::new();
    let v:&'static [u8] =  From::from(person); 
    hasher.input(v);
    let hash = hasher.result();
    println!("Result: {:x}", hash);
    // 1ced8f5be2db23a6513eba4d819c73806424748a7bc6fa0d792cc1c7d1775a9778e894aa91413f6eb79ad5ae2f871eafcc78797e4c82af6d1cbfb1a294a10d10
}
</code></pre>
