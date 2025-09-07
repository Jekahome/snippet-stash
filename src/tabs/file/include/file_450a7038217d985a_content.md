


<pre><code class="language-rust">
    fn read<P: AsRef<std::path::Path>>(path: P){}
    fn read (path: &std::path::Path){}
</code></pre>

---

<pre><code class="language-rust">
    pub struct FileRepository{
        file: PathBuf
    }  
    impl FileRepository{
        pub fn new(file: &(impl AsRef<Path> + ?Sized)) -> std::io::Result<Self>{
            let path:&Path = file.as_ref();
            if !path.exists(){
                return Err(std::io::Error::other("File not found"));
            }
            Ok(Self{file: path.to_path_buf()})
        }
        fn test(&self) -> &Path{
            self.file.as_path()
        }
    }
</code></pre>

---

<pre><code class="language-rust">
    pub struct FileRepository{
        file: String
    }  
    impl FileRepository{
        pub fn new(file: &(impl AsRef<Path> + ?Sized)) -> std::io::Result<Self>{
            let path:&Path = file.as_ref();
            if !path.exists(){
                return Err(std::io::Error::other("File not found"));
            }
            Ok(Self{file: format!("{}",path.display())})
        }
    }
</code></pre>
