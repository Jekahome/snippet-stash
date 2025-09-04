


**par_lines** - Возвращает параллельный итератор по строкам
<pre><code class="language-rust">
fn main(){
    let lengths: Vec<_> = "hello world\nfizbuzz"
        .par_lines()
        .map(|l| l.len())
        .collect();
    assert_eq!(vec![11, 7], lengths);
}
</code></pre>

---

**par_split_whitespace** - Возвращает параллельный итератор над суб-срезами строки, разделяемой любым количеством пробелов.
<pre><code class="language-rust">
fn main(){
    let longest = "which is the longest word?"
        .par_split_whitespace()
        .max_by_key(|word| word.len());
    assert_eq!(Some("longest"), longest);
}
</code></pre>

---

**par_matches** - Возвращает параллельный итератор над подстроками, которые соответствуют заданному символу или предикату, похожим на str::matches
<pre><code class="language-rust">
fn main(){
    let total = "1, 2, buckle, 3, 4, door"
        .par_matches(char::is_numeric)
        .map(|s| s.parse::<i32>().expect("digit"))
        .sum();
    assert_eq!(10, total);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    // par_match_indices как par_matches но возвращает и индекс
    let digits: Vec<_> = "1, 2, buckle, 3, 4, door"
        .par_match_indices(char::is_numeric)
        .collect();
    assert_eq!(digits, vec![(0, "1"), (3, "2"), (14, "3"), (17, "4")]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let total:String =  "1, 2, buckle, 3, 4, Door"
        .par_matches(char::is_uppercase).map(|s| s.to_string()).collect();
    println!("{:?}",total);
}
</code></pre>
