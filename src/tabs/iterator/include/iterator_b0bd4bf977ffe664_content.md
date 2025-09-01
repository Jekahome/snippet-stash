


<pre><code class="language-rust">
fn main(){
    use std::sync::mpsc::channel;
    let (tx, rx) = channel();
    (0..5).map(|x| x * 2 + 1) .for_each(move |x| tx.send(x).unwrap());

    let v: Vec<_> =  rx.iter().collect();
    assert_eq!(v, vec![1, 3, 5, 7, 9]);

    (0..5).flat_map(|x| x * 100 .. x * 110)
      .enumerate()
      .filter(|&(i, x)| (i + x) % 3 == 0)
      .for_each(|(i, x)| println!("{}:{}", i, x));
}
</code></pre>
