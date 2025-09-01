


<pre><code class="language-rust">
fn main(){
    let mut v = [5, 4, 1, 3, 2];
    v.sort_by(|a, b| a.cmp(b));
    assert!(v == [1, 2, 3, 4, 5]);

    // reverse sorting
    v.sort_by(|a, b| b.cmp(a));
    assert!(v == [5, 4, 3, 2, 1]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
use std::cmp::Ordering;

#[derive(Debug)]
struct Point {
    x: i64,
    y: i64,
}

fn main() {
    let mut v = vec![
        Point { x: 3, y: 2 },
        Point { x: 90, y: 78 },
        Point { x: 64, y: 32 },
        Point { x: 1, y: -10 },
        Point { x: 10, y: 10000 },
    ];
    v.sort_by(|a, b| {
        if a.x < b.x {
            Ordering::Less
        } else if a.x == b.x {
            Ordering::Equal
        } else {
            Ordering::Greater
        }
    });
    println!("{:?}", v);
}
}
</code></pre>
