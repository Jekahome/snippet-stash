


<pre><code class="language-rust">
fn main(){
    let mut name1 = "name1".to_string();
    let mut name2 = "name2".to_string();
    let mut vec = vector![name1,name2];
    let   vec_clone = vec.clone();
    // Данные будут склонированны т.е. появится реальная выделенная память только если их изменить (ленивое клонирование на запись Cow)
    *vec.get_mut(0).unwrap()="name3".to_string();
    println!("{} {}",vec.get(0).unwrap(),vec_clone.get(0).unwrap());

    //let new_vec:Vector<String> = vec.update(0, "name3".to_string());
    //println!("{}",new_vec.get(0).unwrap());

    // Как Cow  
    use std::borrow::Cow;
    let mut v:Vec<String>=vec![name1,name2];
    let v1 = Cow::Borrowed(&v);
    let mut v2 = Cow::Borrowed(&v);
    v2.to_mut()[0]="name2".to_string();
    println!("{} {}",v1[0],v2[0]);
}
</code></pre>
