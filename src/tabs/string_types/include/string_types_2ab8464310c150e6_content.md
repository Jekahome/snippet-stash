


<pre><code class="language-rust">
fn main(){
// impl From<&str> for String
   let string:String = From::from("foo");

// impl<'a> From<&'a str> for Cow<'a, str> "auto implies" => `Into<Cow<'a, str>> for &str`
   use std::borrow::Cow;
   let cow:Cow<str> = From::from("foo");
   let cow:Cow<str> = "foo".into();

// impl From<&str> for Arc<str> "auto implies" => `Into<Arc<str>> for &str`
    use std::sync::Arc;
    let shared:Arc<str> = Arc::from("eggplant");
    let shared:Arc<str> = "eggplant".into();

// impl From<&str> for Rc<str> "auto implies" => `Into<Rc<str>> for &str`
    use std::rc::Rc;
    let shared:Rc<str> = Rc::from("statue");
    let shared:Rc<str> = "statue".into();

// impl From<&mut str> for String
    let mut buf:String = String::from("hello");
    let s:&mut str = buf.get_mut(0..).unwrap();
      // let s:&mut str = buf.as_mut();
      // let s:&mut str = buf.borrow_mut();
    let buff:String = String::from(s);

//impl From<&str> for Vec<u8, Global> "auto implies" => `Into<Vec<u8, Global>> for &str`
    let bytes:Vec<u8> = Vec::from("foo");
    let bytes:Vec<u8> = "foo".into();
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
// Получаем значения ошибок
    let io_err: io::Error = io::Error::last_os_error();
    let parse_err: num::ParseIntError = "not a number".parse::<i32>().unwrap_err();

// Собственно, конвертация
    let err1: Box<Error> = From::from(io_err);
    let err2: Box<Error> = From::from(parse_err);
}
</code></pre>
