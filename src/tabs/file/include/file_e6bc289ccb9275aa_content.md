


<pre><code class="language-rust">
use std::io::Seek;
use std::fs::OpenOptions;
fn main(){
    let mut file = OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(name).unwrap();

    file.seek(std::io::SeekFrom::End(2));
    
    let b:&[u8] = "some bytes".as_bytes();
    file.write(b);

    file.seek(std::io::SeekFrom::Start(0));

    let mut buffer = String::new();
    file.read_to_string(&mut buffer);
    println!("{}", buffer);
}
</code></pre>
