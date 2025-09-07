


<pre><code class="language-rust">
use std::fs::File;
use std::io::Read;
fn read() -> std::io::Result<()> {
    let mut f = File::open("file.txt")?;//открыть только для чтения
  //  let mut f1 = File::from("file.txt");
    let mut contents = String::new();
    f.read_to_string(&mut contents)?;// запись в переменную содержимого файла
    println!("{}",contents);
    Ok(())
}
fn main(){
   match read() {
       Ok(r)=> println!("{:?}",r),
       Err(e) => println!("Error:{:?}",e)
   }
}
</code></pre>
