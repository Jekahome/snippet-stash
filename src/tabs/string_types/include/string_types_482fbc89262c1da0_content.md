


<pre><code class="language-rust">
fn main(){
    // Если нужно вхождение:
    let v: Vec<&str> = "abcXXXabcYYYabc".matches("abc").collect();
    let mut string:String = String::from("");
    for i in &v {
        print!("{} ",i);// abc abc abc
        string+=*i;
    }
    let v: Vec<&str> = "1abc2abc3".matches(char::is_numeric).collect();
    assert_eq!(v, ["1", "2", "3"]);

    // Если нужно точное совпадение слова:
    let mut text = "If you to your office late so often, you are in for a great trouble";
    let is_word:bool = text.split_whitespace().any(|w|w=="office");

    // Если нужно точное совпадение подстроки:
    let re = &format!(r"\b({})\b","office");
    regex::Regex::new(re).unwrap().is_match(text)
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let v: Vec<&str> = "abcXXXabcYYYabc".matches("abc").collect();
    let mut string:String = String::from("");
    for i in &v {
        print!("{} ",i);// abc abc abc
        string+=*i;
    }
    println!("string={}",string);// abcabcabc

    let v: Vec<&str> = "1abc2abc3".matches(char::is_numeric).collect();
    for i in &v {
        print!("{} ",i);// 1 2 3
    }
 
    //match_indices
    let v: Vec<_> = "1одинодин2".match_indices("один").collect();
    println!("{:?}",v);// [(1, "один"), (9, "один")]

}
</code></pre>
