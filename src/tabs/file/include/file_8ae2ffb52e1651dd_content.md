


<pre><code class="language-rust">
extern crate failure;
use failure::Error;
fn walk(root: impl AsRef<Path>, callback: impl Fn(&Path)) -> Result<(), Error> {
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
    Ok(())
}

fn main() {
    walk("test",|path| {println!("{:?}", path.display())});
}
</code></pre>
