


<pre><code class="language-rust">
use std::io::Write;
use std::io::BufWriter;
fn test() -> std::io::Result<()> {
    let mut file = std::fs::File::create("foo.txt")?;
    
    let b:&[u8] = b"some bytes"; //  let b:Vec<u8> =vec![115, 111, 109, 101, 32, 98, 121, 116, 101, 115]; // let b:&[u8] = "some bytes".as_bytes();
    file.write(b)?;
    file.flush()?;// Сбросьте этот выходной поток, гарантируя, что все содержимое с промежуточным буфером достигнет места назначения.
    Ok(())
}

fn main(){
    test();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// Запись в файл массива
    let mut payload:Vec<u8> = std::fs::read("store/test.mp3").unwrap().into_iter().collect();
    let mut file = std::fs::File::create("store/array_mp3.raw").unwrap();
    file.write(b"unsigned char test_mp3[] = {\n\t").unwrap();
    for (c,v) in payload.iter().take(127284).enumerate() {// 127284
        file.write(&format!("{:<3},",v).as_bytes()[..]).unwrap();
        if (c+1)%12==0 {
            file.write(b"\n\t").unwrap();
        }
    }
    file.write(b"\n};\n\nunsigned int test_mp3_len = 127284;").unwrap();
    file.flush().unwrap();
}
</code></pre>
