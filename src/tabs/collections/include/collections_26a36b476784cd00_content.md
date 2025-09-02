

<pre><code class="language-rust">
use std::collections::HashMap;
fn main(){
    let mut  user_bets:HashMap<u64,u128> = HashMap::new();
    user_bets.insert(1,200); user_bets.insert(3,300); user_bets.insert(7,100); user_bets.insert(2,20);

    let max_value = user_bets.iter().reduce(|a, b| {
       if a.1 >= b.1 { a } else { b }
    });
// или
    let max_value = user_bets.iter().max_by(|x, y| x.1.cmp(y.1)).unwrap();
    assert_eq!(Some((3, 300)),max_value);
}
</code></pre>
