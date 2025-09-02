


<pre><code class="language-rust">
fn main(){
    let mut v = Vector::new();
    for i in 0..10 {
       v.push_back(i);
    }
    //println!("{:?}",v);// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    // Изменчивый итератор
    for n in v.iter_mut(){
      *n+=10;
      print!("{} ",n);// 10 11 12 13 14 15 16 17 18 19
    }
}
</code></pre>
