


<pre><code class="language-rust">
fn main(){
    use std::ffi::{OsString, OsStr};

    let os_string = OsString::from("foo");
    let os_str = OsStr::new("foo");
    assert_eq!(os_string.as_os_str(), os_str);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    use std::ffi::OsString;

    let os_string = OsString::from("foo");
    let string:String = os_string.into_string();
    assert_eq!(string, Ok(String::from("foo")));
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut os_string = OsString::from("foo");
    os_string.push("bar");
    assert_eq!(&os_string, "foobar");
}
</code></pre>
