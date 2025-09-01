


<pre><code class="language-rust">
fn main(){
    let v:Vec<i32> = vec![1;5]; // [1,1,1,1,1]
 
   let mut v1: Vec<i32> = Vec::new();
    v1[1]=v1[1]+4;
    if !v1.contains(&6){ // проверка существования
      v1.push(6); // вставка в конец
    }
    let item = v1.pop();
    println!("{:?}",item);// Some(10)

    v1.extend([11, 12, 13].iter().cloned());// расширение

    println!("{}",v1.len());// 4
    assert!(!v.is_empty());
    while let Some(top) = v1.pop() {
        print!("{},", top);  //13,12,11,3,
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = vec![1,2,3];
    let first:&i32 = v.first().unwrap();
    assert_eq!(&1, first);
    assert_eq!(&3, v.last().unwrap());
    if let Some(first) = v.first_mut() {
        *first = 5;
    }
    if let Some(last) = v.last_mut() {
        *last = 10;
    }
    assert_eq!(vec![5,2,10], v);
}
</code></pre>
