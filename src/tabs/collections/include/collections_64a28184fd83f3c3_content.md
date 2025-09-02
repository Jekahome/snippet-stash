

вызывая copied для получения `Option<i32>` вместо `Option<&i32>`
<pre><code class="language-rust">
use std::collections::HashMap;
fn main(){
    let mut scores = HashMap::new();
    let team_name = String::from("Blue");
    let score = scores.get(&team_name).copied().unwrap_or(0);
}
</code></pre>
