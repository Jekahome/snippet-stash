


<pre><code class="language-rust">
fn main(){
// impl BorrowMut<str> for String
    use std::borrow::BorrowMut;
    let mut buf:String = String::from("hello");
    let mut s:&mut str = buf.borrow_mut();
    
// impl Borrow<str> for String
     use std::borrow::Borrow;
     let buf:String = String::from("hello");
     let s:&str = buf.borrow();

// impl AsMut<str> for String
    let mut buf:String = String::from("hello");
    let mut s:&mut str = buf.as_mut();

// impl AsMut<str> for str
    let s2:&mut str = s.as_mut();

// impl AsRef<[u8]> for str  
    let arr:&[u8] = "hello".as_ref();

// impl AsRef<Path> for str
    let p:&std::path::Path = ".".as_ref();

// impl AsRef<str> for String
    let buf:String = String::from("hello");
    let s:&str = buf.as_ref();

// impl AsRef<OsStr> for str
    let os:&std::ffi::OsStr = "hello".as_ref();
}
</code></pre>
