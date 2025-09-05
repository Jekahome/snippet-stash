

Понимание времени жизни lifetimes десериализатора

[serde.rs/lifetimes](https://serde.rs/lifetimes.html)

[implementation-of-deserialize-is-not-general-enough](https://users.rust-lang.org/t/implementation-of-deserialize-is-not-general-enough/67384)

**В общем не получится Deserialize структуру с lifetime не имея во владении данные для нее**
 
<pre><code class="language-rust">
fn main(){
 let mut file = std::fs::File::open("example.json").unwrap();
 let mut strbuf = String::new();
 file.read_to_string(&mut strbuf).unwrap();
 let result: SshConfig = serde_json::from_str(&strbuf).unwrap();
 println!("{:?}", result.username);
}
</code></pre>


