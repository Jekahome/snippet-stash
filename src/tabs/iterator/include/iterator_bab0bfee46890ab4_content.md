


<pre><code class="language-rust">
fn main(){
    // map_with - Применяется map_op к данному init значению с каждым элементом этого итератора, создавая новый итератор с результатами.
    // init Значение будет клонирован только по мере необходимости , чтобы быть в паре с группой элементов в каждом районе работы. Для этого не требуется тип Sync
    let (sender, receiver) = channel();
    let a: Vec<_> = (0..5)
        .into_par_iter()
        .map_with(sender, |s, x:i32| {
            s.send(x).unwrap();     // sending i32 values through the channel
            x                       // returning i32
        })
        .collect();
    let mut b: Vec<_> = receiver.iter()         // iterating over the values in the channel
        .collect();     // and collecting them
    b.sort();
    assert_eq!(a, b);
}
</code></pre>
