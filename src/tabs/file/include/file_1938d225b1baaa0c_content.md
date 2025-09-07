


<pre><code class="language-rust">
use std::fs::File;
use std::io::Write;
fn write() -> std::io::Result<()> {
    let mut f = File::create("file2.txt")?;//открыть/создать
    let mut file_copy = f.try_clone()?;// вторая ссылка на дескриптор

    f.write_all(b"Hello, world!")?;// запись в файл
    file_copy.write_all(b"Hello, world!")?;

    f.set_len(30)?;//установить размер/дополнить 0s
    f.sync_all()?;//синхронизировать с диском
    Ok(())
}
fn main(){
  match write() {
        Ok(r)=> println!("{:?}",r),
        Err(e) => println!("Error:{:?}",e)
    }
}
</code></pre>
