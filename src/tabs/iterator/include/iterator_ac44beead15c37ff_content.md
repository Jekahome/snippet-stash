


<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    assert_eq!(a.iter().find(|&&x| x == 2), Some(&2));
    assert_eq!(a.iter().find_map(|&x| if x == 2{Some(x)}else{None}), Some(2)); 

    let first_number = ["lol", "NaN", "2", "5"].iter().find_map(|s| s.parse().ok());
    assert_eq!(first_number, Some(2));

}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    #![feature(try_find)]
    let a = ["1", "2", "lol", "NaN", "5"];
    let is_my_num = |s: &str, search: i32| -> Result<bool, std::num::ParseIntError> {
        Ok(s.parse::<i32>()?  == search)
    };
    let result = a.iter().try_find(|&&s| is_my_num(s, 2));
    assert_eq!(result, Ok(Some(&"2")));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 4, 4,3];
    assert_eq!(a.iter().position(|&x| x == 4), Some(1));
    assert_eq!(a.iter().rposition(|&x| x == 4), Some(2));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    "привет".char_indices().count() 6
    "привет".bytes().count() 12
    "МИР\tТРУД МАЙ".split_whitespace().count() 3
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let c:Option<(usize, char)> = "привет".char_indices().last();
    assert_eq!(c,Some((10, 'т')));

    let c:Option<u8> = "привет".bytes().last();
    assert_eq!(c,Some(130));

    let c:Option<&str> = "МИР\tТРУД МАЙ".split_whitespace().last();
    assert_eq!(c,Some("МАЙ"));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let v1 = vec![1, 2, 3];
    let v1_iter = v1.iter();
    let total: i32 = v1_iter.sum();
    assert_eq!(total, 6);
// -----------------------------------------
    (1..).take_while(|&i| i <= n).sum()
}
</code></pre>

---

<pre><code class="language-rust">
fn factorial(n: u32) -> u32 {
     (1..).take_while(|&i| i <= n).product()
}
fn main(){
    assert_eq!(factorial(0), 1);
    assert_eq!(factorial(1), 1);
    println!("{}",factorial(5));//1*1=1 1*2=2 2*3=6 6*4=24 24*5=120
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut iter4 = "111 222 333".split(' ');
    assert_eq!(Some("222"),iter4.nth(1));
    assert_eq!(Some("333"),iter4.nth(0));
    assert_eq!(None,iter4.nth(0));
}
</code></pre>
