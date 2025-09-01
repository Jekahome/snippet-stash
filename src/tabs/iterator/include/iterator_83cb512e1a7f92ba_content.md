


<pre><code class="language-rust">
fn main(){
    let one_to_one_hundred = (1..101).collect::<Vec<i32>>(); 
    let one_to_one_hundred = (1..101).collect::<Vec<_>>();
    let one_to_one_hundred: Vec<i32> = (0..10).collect();
    let hash = s.chars().zip(s.chars().rev()).collect::<HashMap<_,_>>();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// collect преобразует итератор в коллекцию, требует выделения в куче. 
// Вам следует избегать вызова, collect если затем коллекция повторяется снова.
// По этой причине часто лучше возвращать тип итератора, например, `impl Iterator<Item=T>` из функции, чем из `Vec<T>`

    struct A(Vec<i32>);
    impl<'a> A{
        fn get_item(&self) -> Vec<i32> {
               self.0.clone()
        }
        fn get_item_2(&'a self) -> impl Iterator<Item = &i32> +'a   {
               self.0.iter()
        }
    }
    let a = A(vec![1,2,3]);
    let res:Vec<i32> = a.get_item().into_iter().filter(|item| *item > 1).collect();

    let a = A(vec![1,2,3]);
    let res:Vec<i32> = a.get_item_2().filter(|item| *item > &1).cloned().collect();

    // Точно так же вы можете использовать extend для расширения существующей коллекции 
    // вместо того, чтобы выделяя память в куче collect 
    let mut msg = String::from("abc");
    let msg_extend: Vec<u8> = ['d', 'e', 'f'].iter().map(|c|(*c).try_into()).filter_map(Result::ok).collect(); ❌ 
    msg.push_str(String::from_utf8(msg_extend).expect("unicode character not in u8 range").as_str());
    assert_eq!("abcdef", &msg);

    let mut msg = String::from("abc");
    let iter_extend = ['d', 'e', 'f'].iter();
    msg.extend(iter_extend); ✅  // Расширьте коллекцию содержимым итератора. 
    assert_eq!("abcdef", &msg);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
 let processed = things
    .filter_map(|t| ...)
    .map(|t| ...?; ...; Ok(u))
    .take(42)
    .collect::<Result<Vec<_>,io::Error>()?;
}
</code></pre>
