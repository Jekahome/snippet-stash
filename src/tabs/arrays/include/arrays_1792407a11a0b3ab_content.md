


<pre><code class="language-rust">
fn main(){
#![feature(ascii_char)]
#![feature(const_option)]
    const HEX_DIGITS: [std::ascii::Char; 16] = *b"0123456789abcdef".as_ascii().unwrap();
    assert_eq!(HEX_DIGITS[1].as_str(), "1");
    assert_eq!(HEX_DIGITS[10].as_str(), "a");
}
</code></pre>
