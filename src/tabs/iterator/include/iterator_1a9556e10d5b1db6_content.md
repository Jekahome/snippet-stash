


<pre><code class="language-rust">
fn main(){
    for i in (1..10).skip(1).take(5) {
            println!("{}", i);
    }
    //  бесконечный итератор  (1..)
    for i in (1..).take(5) {
       println!("{}", i);
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut iter = [1, 2, 3].iter().skip(2);
    assert_eq!(iter.next(), Some(&3));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut iter = [-1i32, 0, 1].into_iter().skip_while(|x| x.is_negative());
    assert_eq!(iter.next(), Some(&0));
    assert_eq!(iter.next(), Some(&1));
    Поскольку замыкание, переданное в skip_while(), принимает ссылку
    let mut iter = [-1, 0, 1].into_iter().skip_while(|x| **x < 0); // need two *s!
    let mut iter = [-1, 0, 1].into_iter().skip_while(|&&x| x < 0); 
    assert_eq!(iter.next(), Some(&0));
    assert_eq!(iter.next(), Some(&1));
    Упростить при деструкции
    let mut iter = a.into_iter().filter(|&x| *x < 0); 
    let mut iter = a.into_iter().filter(|&&x| x < 0);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// Обрывает итератор при первом false
    let mut iter = [1, 3, 2,4].into_iter();
    let result: Vec<i32> = iter.by_ref()
            .take_while(|&&n| n != 3)
            .cloned()
            .collect();
    println!("{:?}",result);// 1

    let mut iter = [-1i32, 0, 1].into_iter().take_while(|x| x.is_negative());
    assert_eq!(iter.next(), Some(&-1));
    assert_eq!(iter.next(), None);

    let mut iter = [-1, 0, 1];.into_iter().take_while(|&&x| x < 0); // need two *s!
    assert_eq!(iter.next(), Some(&-1));
    assert_eq!(iter.next(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, -3, 4];
    let mut iter = a.iter();
    let result: Vec<u32> = iter.by_ref().map_while(|n| u32::try_from(*n).ok()).collect();
    assert_eq!(result, &[1, 2]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut iter = [0, 1, 2, 3, 4, 5].iter().step_by(2);
    assert_eq!(iter.next(), Some(&0));
    assert_eq!(iter.next(), Some(&2));
    assert_eq!(iter.next(), Some(&4));
    assert_eq!(iter.next(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let vec = vec![1, 2, 3];
    for (index, v) in vec.iter().enumerate() {
       print!( "{} :{}", index,v);
    }

    другой тип индекса через zip
    for (count, v) in vec.iter().zip(0i32..) {
        print!( "{}:{} ", count,v);
    }
}
</code></pre>

---

<pre><code class="language-rust">
#![feature(iter_advance_by)]
fn main(){
    use std::num::NonZeroUsize;
    let a = [1, 2, 3, 4];
    let mut iter = a.iter();
    assert_eq!(iter.advance_by(2), Ok(()));  assert_eq!(iter.next(), Some(&3));  assert_eq!(iter.advance_by(0), Ok(()));
    assert_eq!(iter.advance_by(100), Err(NonZeroUsize::new(99).unwrap())); // only `&4` was skipped
}
</code></pre>
