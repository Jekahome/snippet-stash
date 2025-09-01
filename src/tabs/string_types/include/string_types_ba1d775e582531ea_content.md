


<pre><code class="language-rust">
fn main(){
    let mut s = String::with_capacity(3);
    s.insert(0, 'f');
    s.insert(1, 'o');
    s.insert(2, 'o');
    assert_eq!("foo", s);

    let mut s = String::with_capacity(3);
    s.insert(0, 'т');
    s.insert(0, 'е');
    s.insert(0, 'н');
    assert_eq!("нет", s);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut s = String::from("bar");
    s.insert_str(0, "foo");
    assert_eq!("foobar", s);
}
</code></pre>

---


string.extend(iter) дописывает в конец объекты, порождаемые итератором iter. 

Итератор может порождать значения типа char , str или String . 

Все это реализации трейта std::iter::Extend для типа String

```
Extend<&'a char>
Extend<&'a str>
Extend<Box<str, Global>>
Extend<Cow<'a, str>>
Extend<String>
Extend<char>
```
<pre><code class="language-rust">
fn main(){
    let mut s = "con".to_string();
    s.extend("tri but ion".split_whitespace());
    assert_eq!(s, "contribution");

    let mut s = "".to_string();
    s.extend("hello".chars());
    assert_eq!(s, "hello");

    let mut msg = String::from("abc");
    let iter_extend = ['d', 'e', 'f'].iter();
    msg.extend(iter_extend);
    assert_eq!("abcdef", &msg);
}
</code></pre>
