

<pre><code class="language-rust">
fn main(){
    let s = " Hello\tworld\t";
    println!("|{}|",s.trim());// |Hello        world|

    println!("{}","11foo1bar11".trim_matches('1') );// foo1bar
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut bananas = "-Then 0le-ole quickly-".to_string();
    if bananas.starts_with("'"){
      bananas = bananas.strip_prefix("'").unwrap().to_string();
    }
    if bananas.ends_with("'"){
      bananas = bananas.strip_suffix("-").unwrap().to_string();
    }
    assert_eq!("Then 0le-ole quickly",bananas.as_str());
}
</code></pre>

---

<pre><code class="language-rust">
// Удаление пробелов из середины строки
fn filter_chars(s:&str){
   let mut is_last_space = false;
   let result: String = s.chars().filter(|c| { 
        if is_last_space && c.is_whitespace()  {
            return false;
        }else if !is_last_space && c.is_whitespace(){
            is_last_space = true;
            return true;
        }else if !is_last_space && !c.is_whitespace(){
            return true;
        }else if is_last_space && !c.is_whitespace(){
            is_last_space = false;
            return true;
        }
        true
    }).collect();
   println!("{}", result);
}
fn filter_split_whitespace(s:&str){
    let mut result:String = s.split_whitespace().fold(String::from(""), |mut state, x| {
        state.push_str(&x);
        state.push_str(" ");
        state
    });
   let result = result.trim();
   println!("{}", result);

}
fn filter_regex(s:&str){
    use regex::Regex;
    let re = Regex::new(r"[ ]{2,}").unwrap();
    let result = re.replace_all(s, " ");
    println!("{}", result); // => Hello World
}
fn filter_dedup_by(s:&str){
    let mut s: Vec<char> = Vec::from_iter(s.chars());
    s.dedup_by(|a, b| a.is_whitespace() && b.is_whitespace());
    let result: String = String::from_iter(s);
    println!("{result}",);
}
fn main() {
    filter_regex("aaa   bbb   ccc");
    filter_split_whitespace("aaa   bbb   ccc");
    filter_chars("aaa   bbb   ccc");
    filter_dedup_by("aaa   bbb   ccc");
}
</code></pre>

