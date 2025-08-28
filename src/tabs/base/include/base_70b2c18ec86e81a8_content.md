


<pre><code class="language-rust">
#[derive(Debug, Serialize, Deserialize, PartialEq)]
enum ErrorLevel2{
    DEBUG,INFO,WARN,ERROR,PANIC,EMPTY
}
impl From<&'static str> for ErrorLevel2 {
    fn from(s: &'static str) -> Self {
        match s{
            "debug" => ErrorLevel2::DEBUG ,
            "" => ErrorLevel2::EMPTY ,
            _ => ErrorLevel2::PANIC
        }
    }
}
fn main(){
    let p:ErrorLevel2 = ErrorLevel2::from("debug");
    print!("{:?}",p);
    assert_eq!(ErrorLevel2::DEBUG ,p);
}
</code></pre>
