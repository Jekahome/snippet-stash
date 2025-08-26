


<pre><code class="language-rust">
#[derive(Debug,Clone)]
struct Wrap< T>(T);

impl< T> AsRef< T> for Wrap< T> {
    fn as_ref(&self) -> &T {
        &self.0
    }
}
impl< T> AsMut< T> for Wrap< T> {
    fn as_mut(&mut self) -> &mut T {
        &mut self.0
    }
}
impl AsRef< str> for Wrap< String> {
    fn as_ref(&self) -> &str {
        &self.0
    }
} 
impl AsRef< [u8]> for Wrap< String> {
    fn as_ref(&self) -> &[u8] {
        self.0.as_bytes()
    }
}
fn use_string< T:AsRef< String>>(item:&T){
    assert_eq!("...",item.as_ref());  
}
fn main(){
    let mut w = Wrap::< String>(String::from("..."));
    let v:&String = w.as_ref();
    //let s:&str = w.as_ref();
    let v:&mut String = w.as_mut();
    use_string(&w);
    //println!("{}",w.as_ref());// если б была только одна реализация AsRef
    //println!("{}",< Wrap::< str> as AsRef< str>>::as_ref(&w));// из-за наличия двух реализаций, мы уточним конкретную

    let bytes: &[u8] = w.as_ref(); // вывод типа компилятором на основе сигнатуры принимаемого
    assert_eq!([46,46,46],bytes);
}
</code></pre>
