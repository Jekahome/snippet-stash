


<pre><code class="language-rust">
 fn search_case_insensitive(s: &str) -> bool {
    let s: &str = if search_lowercased(s) {
        s
    } else {
        &s.to_lowercase() // to_lowercase возвращает String и далее мы возвращаем локальную ссылку &String. Мы не можем с этим локальным lifetime вызвать search_lowercased, так как он удалиться раньше 
        /* тоже самое
         let temp = s.to_lowercase();
         &temp
        */
    };
    /*в этом месте удалиться &temp т.е. еще до search_lowercased */
    search_lowercased(&s)
}
</code></pre>


следует преобразовать в:
<pre><code class="language-rust">
pub fn search_case_insensitive(s: &str) -> bool {
    let lowercased: String;
    let s: &str = if search_lowercased(s) {
           s
        } else {
            lowercased = s.to_lowercase();
            &lowercased
    };
    search_lowercased(&s)
}
fn search_lowercased(s: &str) -> bool {
 // ....
 true
}
</code></pre>
