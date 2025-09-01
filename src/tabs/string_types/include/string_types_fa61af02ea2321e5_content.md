


<pre><code class="language-rust">
fn main(){
    let string:String = String::from("birthday gift");
    let boxed_str:Box<str> = string.clone().into_boxed_str();
    assert_eq!(boxed_str.into_string(), string);
}
</code></pre>
