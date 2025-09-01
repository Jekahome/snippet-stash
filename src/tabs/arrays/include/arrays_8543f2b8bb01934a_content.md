


<pre><code class="language-rust">
fn main(){
    // 1. Взять последнее значение
    let fifth = v.pop().unwrap();

    // 2. Взять значение из середины вектора и переместить на его место
    let mut value:Vec<i32> = vec![1,2,3,4,5];
    value.swap_remove(0); // [1,2,3,4,5] => [5, 2, 3, 4]

    // 3. Подставить другое значение вместо изъятого:
    let third = std::mem::replace(&mut v[2], "substitute".to_string());

    let mut vec = vec![1, 2, 3, 4];
    vec.retain(|&x| x%2 == 0);
    assert_eq!(vec, [2, 4]);

    let mut vec = vec![1, 2, 3, 4];
    vec.retain_mut(|x| if *x <= 3 {
        *x += 1;
        true
    } else {
        false
    });
    assert_eq!(vec, [2, 3, 4]);
}
</code></pre>
