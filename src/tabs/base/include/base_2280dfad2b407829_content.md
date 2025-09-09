

```rust
use std::io::Write;
use std::path::{Path,PathBuf};
use std::error;

fn walk(root: impl AsRef<Path>, callback: impl Fn(&Path)) -> Result<Vec<PathBuf>, Box<dyn error::Error>> {
    let root = root.as_ref().to_path_buf();
    let mut tasks = vec![root];

    while let Some(path) = tasks.pop() {
        if path.is_file() {
            callback(&path);
        } else if path.is_dir() {
            for dir in std::fs::read_dir(&path)? {
                tasks.push(dir?.path());
            }
        }
    }
    Ok(tasks)
}
// или
use std::fs::{self, DirEntry};
fn visit_dirs(dir: &Path, cb: &dyn Fn(&DirEntry)) -> std::io::Result<()> {
    if dir.is_dir() {
        for entry in fs::read_dir(dir)? {
            let entry = entry?;
            let path = entry.path();
            if path.is_dir() {
                visit_dirs(&path, cb)?;
            } else {
                cb(&entry);
            }
        }
    }
    Ok(())
}
fn main(){
    let mut path: PathBuf = PathBuf::new();
    path.push(r"./adder/picture");
    if path.exists() { 
       walk(&path, |path| {println!("{:?}", path.display())}); 
       // или
       let f = |entry:&DirEntry| {println!("{:?}", entry.path().display());};
       visit_dirs(&path,  &f); 
    }
}
```

