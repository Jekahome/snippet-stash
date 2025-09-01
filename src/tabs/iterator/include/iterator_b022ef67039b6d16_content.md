


<pre><code class="language-rust">
fn example<I: Iterator<Item = i32>>(mut iter: I) {
    let first3: Vec<i32> = iter.by_ref().take(3).collect(); // возьмем ссылку чтобы можно было использовать iter повторно в for 
    for item in iter { 
        // process remaining items
    }
}
fn main(){
    example(1..10); // 1..10 реализует Iterator<Item = i32>

    let v = vec![10, 20, 30, 40, 50];
    example(v.into_iter()); // into_iter() делает итератор по i32

    let v = vec![10, 20, 30, 40, 50];
    example(v.into_iter());  

    let mut n = 0;
    let gen = std::iter::from_fn(move || {
        n += 1;
        if n <= 7 { Some(n * 10) } else { None }
    });
    example(gen);
}
</code></pre>
