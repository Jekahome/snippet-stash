


<pre><code class="language-rust">
fn rec(dir: &std::path::Path)-> std::io::Result<()>{
    
    if let Ok(entries) = std::fs::read_dir(dir) {
        for entry in entries {
            if let Ok(entry) = entry {

                // Here, `entry` is a `DirEntry`.

                if entry.path().is_dir(){
                    println!("DIR:{:?}", entry.path());

                    rec(&entry.path());
                    std::fs::remove_dir(entry.path())?;

                }else{
                    println!("FILE:{:?}", entry.path());
                    if let Ok(metadata) = entry.metadata() {
                        // Now let's show our entry's permissions!
                        println!("{:?}", metadata.permissions());
                    } else {
                        println!("Couldn't get metadata for {:?}", entry.path());
                    }
                    std::fs::remove_file(entry.path())?;
                }
            }
        }
        Ok(())
    }else{
        Err(std::io::Error::new(std::io::ErrorKind::Other, "oh no!"))
    }
}

fn main() {
    
    let path = std::path::Path::new("test");

    match rec(path) {
        Ok(n) =>   { std::fs::remove_dir(path);println!("Ok");},
        Err(err) => { println!("Error: {}", err);}
    };
}
</code></pre>
