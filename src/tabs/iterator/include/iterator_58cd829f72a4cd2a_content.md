


<pre><code class="language-rust">
fn main(){
    //На каждой итерации вызывается замыкание, результат выполнения которого становится значением accumulator на следующей итерации.
    fold(base, |accumulator, element| ...)
      base - это элемент, называемый базой;
      |accumulator, element| — accumulator - сумма результатов каждой итерации, element - текущее значение.
        
    let init = 10;
    let mut total:i32 = [1, 2, 3].iter().fold(init, |mut state, &x| {
        state = state * x;
        state
    });
    assert_eq!(total,60);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let init = 10;
    let mut total:i32 = [1, 2, 3].iter().try_fold(init, |mut state, &x| {
        state = state * x;
        if state < 60{
           return Some(state);// или Ok(state) 
        }
        None
    }).expect("msg non value");
    assert_eq!(total,60);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    let (even, odd): (Vec<i32>, Vec<i32>) = a
            .into_iter()
            .partition(|&n| n % 2 == 0);
    assert_eq!(even, vec![2]);
    assert_eq!(odd, vec![1, 3]);
}
</code></pre>
