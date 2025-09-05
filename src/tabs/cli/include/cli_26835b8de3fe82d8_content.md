

<pre><code class="language-rust">
fn main(){
    if let Ok(path) = env::current_dir().and_then(|a| Ok(a.join(".env"))){
        dotenv::from_path(path);
        let key = "ENV_VAR_TWO";
         match env::var_os(key) {
            Some(val) => assert_eq!(std::ffi::OsStr::new("true"),val) ,
            None => assert!(false)
        }
    }else{
           asser!(false);
    }
}
</code></pre>
