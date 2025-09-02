

<pre><code class="language-rust">
fn main(){
    let maybe_some_string = Some(String::from("Hello, World!"));
    let maybe_some_len:Option<usize> = maybe_some_string.map(|s| s.len());
    assert_eq!(maybe_some_len, Some(13));  
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = Some("foo");
    assert_eq!(x.map_or(42, |v| v.len()), 3);

    let x: Option<&str> = None;
    assert_eq!(x.map_or(42, |v| v.len()), 42);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let k = 21;
    let x = Some("foo");
    assert_eq!(  x.map_or_else(|| 2 * k  ,  |v| v.len())     , 3);
}
</code></pre>

---


<pre><code class="language-rust">
fn main(){
    let text: Option<String> = Some("Hello, world!".to_string());
    let text_length: Option<usize> = text.as_ref().map(|s| s.len());
    println!("still can print text: {:?}", text);
}
</code></pre>

<pre><code class="language-rust">
// Пример с Cow<'static, str>
pub struct Core {
    orm: Box<dyn Store>,
    pub user: Option<Cow<'static, str>>,
}

fn main(){
    self.user
            .as_ref()
            .map_or(Err(CustomError::Unauthorized), |_| {
....
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut x = Some(2);
    match x.as_mut() {
        Some(v) => *v = 42,
        None => {},
    }
    assert_eq!(x, Some(42));
}
</code></pre>

---

<pre><code class="language-rust">
#[derive(Debug)]
struct B(i32)
fn main() {
  let mut test:Option<B> = Some(B(88));
  let b_mut = test.as_mut().unwrap();
  b_mut.0 = 44;
  if let Some(b) = &test{
       assert_eq!(b.0,44); 
  }
  println!("{:?}",&test);// Some(B(44))
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let x: Option<String> = Some("hey".to_owned());
    let x: Option<&str> = x.as_deref();

    let mut x: Option<String> = Some("hey".to_owned());
    assert_eq!(x.as_deref_mut().map(|x| {
        x.make_ascii_uppercase();
        x
    }), Some("HEY".to_owned().as_mut_str()));
}
</code></pre>

