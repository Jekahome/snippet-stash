

**Splitting to iterator**

* **split(Pattern) -> Iterato** - разбивает строку по Pattern и выдает по ним итератор
* **rsplit (Pattern) -> Iterator**
* **splitn  (usize, Pattern) -> Iterator** - как split но с ограничением
* **rsplitn (usize, Pattern) -> Iterato** - как rsplit но с ограничением
* **split_at(usize) -> (&str, &str)** - Разделяет строку на две по индексу.
* **split_at_mut()** - Делит строку на два фрагмента по номеру байта
* **split_whitespace() -> Iterator** - разделитель [по пробелу, \n , \t]
    Возвращенный итератор вернет строковые срезы, которые являются суб-срезами исходного среза строки, разделенные любым количеством пробелов.

* **lines()** - Итератор по разделенным строкам `\n`
* **split_terminator(Pattern) -> Iterator** - как split но без включения завершающей строки
* **rsplit_terminator(Pattern) -> Iterator**
* **split_ascii_whitespace() -> Iterator** - Разбивает фрагмент строки по пробелу ASCII

---

<pre><code class="language-rust">
fn main(){
    let v: Vec<&str> = "00:32:14.059 --> 00:32:16.687".split("-->").collect();
    assert_eq!("00:32:14.059 ",v[0]);
    assert_eq!(" 00:32:16.687",v[1]);
    println!("{:?}", v);
// -----------------------------------------------------
    let s = String::from("Per Martin-Löf");
    let s =  "Per_Martin-Löf" ;
    let (first, last) = s.split_at_mut(3);
    first.make_ascii_uppercase();
    println!("{}",first);//Per
    println!("{}",last);//_Martin-Löf
// -----------------------------------------------------
    let mut s = String::from("Per_Martin-Löf");
    if let Some(index) = s.find('_'){
         assert_eq!(3,index);
         let (first, last) = s.split_at_mut(index);
         println!("{}",first);//Per
         println!("{}",last);//_Martin-Löf
    }
// ------------------------------------------------------
    let mut iter = "МИР\tТРУД МАЙ".split_whitespace();
    while let  Some( mut s) = iter.next(){
        // s:&str
        print!("{}_", s);// МИР_ТРУД_МАЙ_
    } 
// -----------------------------------------------------------------------
    let text = "foo\r\nbar\n\nbaz\n";
    let mut lines = text.lines();
    while let  Some( mut s) = lines.next(){
        // s:&str
        print!("{}_", s);// foo_bar__baz_
    }
}
</code></pre>
