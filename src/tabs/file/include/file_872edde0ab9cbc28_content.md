


<pre><code class="language-rust">
use std::io::prelude::*;
use std::io::BufReader;
use std::fs::File;
fn main() -> std::io::Result<()> {
    let mut file_vtt = File::open("examples/Sub.vtt")?;
    let mut reader = BufReader::new(file_vtt);

    let mut line = String::new();
    {
        let len = reader.read_line(&mut line)?;
        println!("First line is {len} bytes long");
        print!("{line}");
    }
    line.clear();
    {
        let len = reader.read_line(&mut line)?;
        println!("First line is {len} bytes long");
        print!("{line}");
    }
//  ....
    Ok(())
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let f = fs::File::open("source/video.mp4")?;
    let mut reader = BufReader::new(f);
    let mut buffer = [0; 128];
    loop{
        if let Ok(n) = reader.read(&mut buffer[..]){
            println!("N:{n}");
            println!("{:?}",buffer);
        }else{
            println!("Err");
            break;
        }
    }
}
</code></pre>
