


<pre><code class="language-rust">
fn main(){
    let s = "Привет Мир!";
    let s = "Hello World!";
    // char ------------------------------
    if let Some(n) =  s.find('е'){
        println!("{}",n);// 17
    }
    // &str -------------------------------
    if let Some(n) =  s.find("Мир"){
        println!("{}",n);// 13
    }
    // &[char] ---------------------------
    let s = "Hello World!";
    let x: &[_] = &['W', 'd'];// первый совпавший символ
    if let Some(n) = s.find(x){
        println!("{}",n);// 6
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    // char method --------------------
    assert_eq!("Hello World!".find(char::is_whitespace), Some(5));
    // FnMut(char) -> bool ----------
    {
        // возвращает байт последнего символа совпавшей строки
        let mut buff:String = String::from("");
        if let Some(n) =  s.find( move |_char:char |{
            if _char.is_whitespace(){ println!("is_whitespace");}
            if _char.is_lowercase(){ println!("is_lowercase");}
            if _char < 'a' { println!("< 'a' ");}
            buff.push(_char);
            println!("buff={} ",buff);
           if buff.contains("Hello"){ true }
           else{ false }
        }){
            println!("{}",n);// 4-й байт
        }
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    // rfind() -  Возвращает индекс байта последнего совпадения
    let s = "Hello World!";
    let x: &[_] = &['W', 'd'];
    if let Some(n) =  s.rfind(x){
        println!("{}",n);// 10
    }
}
</code></pre>




