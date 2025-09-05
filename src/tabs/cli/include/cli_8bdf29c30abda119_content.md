


<pre><code class="language-rust">
fn main(){
    let data = vec![
        (String::from("ONE"), String::from("test")),
        (String::from("TWO"), String::from("1")),
        (String::from("THREE"), String::from("true")),
    ];
    match envy::prefixed("ENV_VAR_").friter::<_, Config>(data.into_iter()) {
        Ok(config) => {
            println!("{:#?}", config);
        }
        Err(error) => {eprintln!("{:#?}", error);}
    }
}
</code></pre>
