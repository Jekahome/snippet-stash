


<pre><code class="language-rust">
use std::path::Path;
use std::fs::File;
struct CFile<T>{
    file:T,
    name:String,
    count:i32
}
impl<T> Drop for CFile<T> {
    fn drop(&mut self) {
        //std::fs::remove_file(&self.name);
        println!("CFile is being dropped ");

    }
}
// красиво, тип T известен как File
impl CFile<std::fs::File>{
    fn new(name:&str)->CFile<File>{
        let file = File::create(Path::new(name)).unwrap();
        CFile{
            file: file,count:1,name:name.to_string()
        }
    }
}
// Не красиво 
impl<T> CFile<T> {
    fn new2(file:T,name:&str)->Self{
        /*
            Если мы внутри создадим тип T то будет несовпадение типов
            так как у `CFile<T>` неопрежеден T 
            let file = File::create(Path::new(name)).unwrap();
            Можем только снаружи задать тип T как File
        */
        CFile{
            file: file,count:1,name:name.to_string()
        }
    }
}
fn main(){
    let name  = "file.txt";
    // Не красиво
    let file = File::create(Path::new(name)).unwrap();
    let c:CFile<File> =  CFile::new2( file,name);
     
    // Красиво
    let f = CFile::new( name);
}
</code></pre>
