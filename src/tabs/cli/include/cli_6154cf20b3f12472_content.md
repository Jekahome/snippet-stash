


<pre><code class="language-rust">
fn main(){
    // All vars
    for (key, value) in env::vars_os() {
      //  println!("{:?}: {:?}", key, value);
    }
    // env::split_paths 
    let key = "PATH";
    match env::var_os(key) {
        Some(paths) => {
            for path in env::split_paths(&paths) {
                println!("'{}'", path.display());
            }
        }
        None => println!("{} is not defined in the environment.", key)
    }
    //'/home/mint/bin'
    //'/home/mint/.local/bin'
    //'/usr/local/sbin'
     
    // Возвращает путь к домашнему каталогу текущего пользователя, если он известен.
    match env::home_dir() {
        Some(path) => println!("{}", path.display()),
        None => println!("Impossible to get your home dir!"),
    }
}
</code></pre>
