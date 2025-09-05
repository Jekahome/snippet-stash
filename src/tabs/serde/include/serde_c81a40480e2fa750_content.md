


<pre><code class="language-rust">
use musli::{Encode, Decode};
use musli_utils::options::{self, Options, Integer};
use musli_storage::Encoding;

const OPTIONS: Options = options::new().with_integer(Integer::Fixed).build();
const CONFIG: Encoding<OPTIONS> = Encoding::new().with_options();

#[derive(Debug, PartialEq, Encode, Decode)]
struct Struct<'a> {
    name: &'a str,
    age: u32,
}
fn main(){
    let mut out = Vec::new();

    let object = Struct {
        name: "Aristotle",
        age: 61,
    };

    CONFIG.encode(&mut out, &object).unwrap();
    println!("Serialized data: {:?}", out);

    let deserialized: Struct<'_> = CONFIG.decode(&out[..]).unwrap();
    println!("{:?}",deserialized);
    assert_eq!(object, deserialized);
}
</code></pre>
