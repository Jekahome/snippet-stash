


<pre><code class="language-rust">
fn main(){
    let v: String = String::from("Привет");
    let v:&str = "Привет";
    let opt:Option<&str> = v.get(0..);
    if let Some(i) = opt{  println!("{}",i);}
    //let v: Vec<u8> = From::from("hello");
    //for i in v.iter() {  print!("{} ",*i);}
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut buf:String = String::from("hello");
    let s:&mut str = buf.as_mut();
    let s:Option<&mut str> = s.get_mut(0..);
    let s = s.map(|s| {
        print!("{},",&*s);
        s.make_ascii_uppercase();// для латиницы
        &*s
    });
    if let Some(i) = s{
        println!("{}",i);// HELLO
    }
}
</code></pre>

---

* Начальный индекс должен быть до конца индекса;
* Индексы должны находиться в пределах исходного фрагмента;
* Индексы должны лежать на границах последовательности UTF-8.

В противном случае возвращаемый фрагмент строки может ссылаться на недопустимую память или нарушать инварианты, передаваемые типом str.

<pre><code class="language-rust">
fn main(){
    let v:String = String::from("Привет");
    let v:&str = "Привет";
    unsafe {
        let opt:Option<&str> = v.get_unchecked(0..55);

        if let Some(i) = opt{
            println!("{}",i);
        }
    }
}
</code></pre>
