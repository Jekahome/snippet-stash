


<pre><code class="language-rust">
use std::fs;
use std::io::{Read, SeekFrom, Write};
use std::path::Path;

mod SPFile {
    use super::*;
    use std::ops::{Deref, DerefMut};

    #[derive(Debug)]
    pub struct File<'a, T> {
        pub file: T,
        path: &'a Path,
    }
    impl<'a, T> Deref for File<'a, T> {
        type Target = T;
        fn deref(&self) -> &T {
            &self.file
        }
    }
    impl<'a, T> DerefMut for File<'a, T> {
        fn deref_mut(&mut self) -> &mut T {
            &mut self.file
        }
    }
    impl<'a, T> Drop for File<'a, T> {
        fn drop(&mut self) {
            if let Some(file_name) = &self.path.file_name() {
                std::fs::remove_file(file_name);
                println!("File is being dropped");
            }
        }
    }
    impl<'a> File<'a, fs::File> {
        pub fn open(path: &'a Path) -> Option<File<fs::File>> {
            let name = path.to_str()?;
            let file = fs::File::open(name).ok()?;
            Some(File::new(file, path))
        }
        pub fn create(path: &'a Path) -> Option<File<fs::File>> {
            let name = path.to_str()?;
            let file = fs::File::create(name).ok()?;
            Some(File::new(file, path))
        }
    }
    impl<'a, T> File<'a, T> {
        fn new(file: T, path: &'a Path) -> Self {
            File {
                file: file,
                path: path,
            }
        }
    }
}
fn main() {
    use SPFile::File;
    let path = Path::new("file.txt");
    if let Some(_file) = File::create(path) {
        let b: &[u8] = "some bytes".as_bytes();
        let mut file = &*_file;
        file.write(b);
    };
}
</code></pre>
