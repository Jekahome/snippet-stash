

```
use std::ffi::{OsString, OsStr};
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;
fn find_ex(dir: &std::path::Path, ex:&OsStr)-> std::io::Result<()>{
    if let Ok(entries) = std::fs::read_dir(dir) {
        for entry in entries {
            if let Ok(entry) = entry {
                if entry.path().is_dir(){
                    find_ex(&entry.path(),ex);
                }else{
                        if Some(ex)==entry.path().extension(){
                            if let Ok(lines) = read_lines(entry.path()) {
                                println!("File {:?} contains {} lines",entry.path(), lines.into_iter().count());
                            }
                        }
                }
            }
        }
        Ok(())
    }else{
        Err(std::io::Error::new(std::io::ErrorKind::Other, "The path is not valid"))
    }
}
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
    where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
fn main() {
    find_ex(Path::new("examples"),OsStr::new("rs"));
}
```
