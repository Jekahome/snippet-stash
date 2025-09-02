

<pre><code class="language-rust">
fn main(){
    let mut vars: [&str; 3] = ["ENV_VAR_THREE", "ENV_VAR_TWO", "ENV_VAR_ONE"];
    let vars_map: HashMap<String, String> = vars
        .into_iter()
        .map(|&var| {
            env::var_os(var)
                .ok_or((var.to_uppercase(), String::from("<absent>")))
                .and_then(|value| {
                    if !value.is_empty() {
                        Ok((
                            var.to_uppercase(),
                            value.into_string().unwrap_or(String::from("<empty>")),
                        ))
                    } else {
                        Ok((var.to_uppercase(), String::from("<empty>")))
                    }
                })
                .unwrap_or((var.to_uppercase(), String::from("<absent>")))
    })
    .collect();
}
</code></pre>
