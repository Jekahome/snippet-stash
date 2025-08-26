


<pre><code class="language-rust">
#[derive(Debug,Clone)]
struct Wrap(String);

impl AsRef<String> for Wrap {
    fn as_ref(&self) -> &String {
        &self.0
    }
}
impl AsRef<str> for Wrap {
    fn as_ref(&self) -> &str {
        self.0.as_str()
    }
}
impl AsMut<String> for Wrap {
    fn as_mut(&mut self) -> &mut String {
        &mut self.0
    }
}
impl AsRef<[u8]> for Wrap {
    fn as_ref(&self) -> &[u8] {
        self.0.as_bytes()
    }
}
fn use_string<T:AsRef<str>>(item:&T){
    assert_eq!("...",item.as_ref());  
}
fn main(){
    let mut w = Wrap(String::from("..."));
    let v:&String = w.as_ref();
    let s:&str = w.as_ref();
    let v:&mut String = w.as_mut();
    use_string(&w);
    //println!("{}",w.as_ref());// если б была только одна реализация AsRef
    println!("{}",<Wrap as AsRef<str>>::as_ref(&w));// из-за наличия двух реализаций, мы уточним конкретную

    let bytes: &[u8] = w.as_ref(); // вывод типа компилятором на основе сигнатуры принимаемого
    assert_eq!([46,46,46],bytes);
}
</code></pre>
