

<pre><code class="language-rust">
struct Token<'a> {
        raw: Cow<'a, str>
}

impl<'a> Token<'a> {
        pub fn new<S>(raw: S) -> Token<'a> where S: Into<Cow<'a, str>> {
            Token { raw: raw.into() }
        }
}
fn main(){
    let token_static = Token::new("abc123");
    println!("six:{}",token_static.raw);

    let secret: String =  String::from("abc123") ;
    let token_owned = Token::new(secret);
    println!("six:{}",token_owned.raw);
}
</code></pre>
