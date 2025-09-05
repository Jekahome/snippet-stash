


<pre><code class="language-rust">
fn main(){
    let case_sensitive = env::var("CASE_INSENSITIVE").is_err();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .arg("/C")
            .arg("echo $".to_owned()+APP_CONF)
            .output()
            .expect("failed to execute process in windows")
    } else {
        std::process::Command::new("sh")
            .arg("-c")
            .arg("echo $".to_owned()+APP_CONF)
            .output()
            .expect("failed to execute process in other OS")
    };

    match std::str::from_utf8(&output.stdout) {
        Ok(result) => {
            match  path() {
                Ok(path) => {
                    if !result.trim().is_empty() {
                        assert_eq!(path.trim(),  result.trim())
                    }else{
                        // else is default
                        assert!(!default_path.is_empty());
                    }
                },
                Err(e) => assert!(false)
            }
        },
        Err(e) => {
            // else is default
            assert!(!default_path.is_empty());
        }
    }

}
</code></pre>
