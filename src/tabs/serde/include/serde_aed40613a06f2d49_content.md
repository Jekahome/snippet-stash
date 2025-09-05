

```toml
[dependencies]
serde = "1.0"
serde_json = "1.0"
serde_repr = "0.1"
```

<pre><code class="language-rust">
use serde_repr::*;

#[derive(Serialize_repr, Deserialize_repr, PartialEq, Debug)]
#[repr(u8)]
enum SmallPrime {
    Two = 2,
    Three = 3,
    Five = 5,
    Seven = 7,
}
fn main() {
    use SmallPrime::*;
    let nums = vec![Two, Three, Five, Seven];

    // Prints [2,3,5,7]
    println!("{}", serde_json::to_string(&nums).unwrap());
    assert_eq!(Two, serde_json::from_str("2").unwrap());
}
</code></pre>
