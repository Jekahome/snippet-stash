

разница в том что Rc считает владельцев и уничтожает данные после последнего а &mut не владеет данными



<pre><code class="language-rust">
#![allow(dead_code)]
use std::rc::Rc;
use std::fs::File;
use std::path::Path;
use std::io::Read;
fn rc_start_read(path: &Path)-> std::io::Result<()>{
    let mut file = File::open(path)?;
    let mut file_content:std::vec::Vec<u8> = Vec::new();
    file.read_to_end(&mut file_content)?;
 
    let mut rc_file_content = Rc::new(file_content);
// с правом собственности и без клонирования всего содержимого файла каждый раз
    rc_read(Rc::clone(&rc_file_content));
    rc_read(Rc::clone(&rc_file_content));
    rc_read(Rc::clone(&rc_file_content));
    rc_read(Rc::clone(&rc_file_content));
    rc_read(Rc::clone(&rc_file_content));
   println!("{:?}",file_content); Ошибка данные уничтожены после последней ссылки
    Ok(())
}
fn rc_read(buffer:Rc<Vec<u8>>){
    let content:std::borrow::Cow<str> = String::from_utf8_lossy(&buffer);
    println!("{:?}",content.len());
    //println!("{:?}",content.into_owned());
}
/// без разделения ссылки
fn start_read(path: &Path)-> std::io::Result<()>{
    let mut file = File::open(path)?;
    let mut file_content:std::vec::Vec<u8> = Vec::new();
    file.read_to_end(&mut file_content)?;
// без права собственности по разделяемой ссылке
    read( &mut file_content);
    read( &mut file_content);
    read( &mut file_content);
    read( &mut file_content);
    read( &mut file_content);
   println!("{:?}",file_content); // Доступны
    Ok(())
}
fn read(buffer:&mut Vec<u8>){
    let content:std::borrow::Cow<str> = String::from_utf8_lossy(&buffer);
    println!("{:?}",content.len());
    //println!("{:?}",content.into_owned());
}
fn main(){
    let path = std::path::Path::new("war_and_peace.pdf");
    // c Rc
    rc_start_read(&path);
    // без Rc
    start_read(&path);
}
</code></pre>
