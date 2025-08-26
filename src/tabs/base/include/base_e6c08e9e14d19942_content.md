


<pre><code class="language-rust">
fn validate(email:&str)->bool{
    true
}
pub fn new<S: Into<String> + AsRef<str>>(email: S) -> Option<String> {
   if  validate(email.as_ref()) {
        Some(email.into())
   } else {
        None
   }
}
fn main() {
  new("email");
  new("email".to_string());
}
</code></pre>
