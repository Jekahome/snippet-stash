


<pre><code class="language-rust">
#![feature(iter_collect_into)]
fn main(){
    let a = [1, 2, 3];
    let mut vec: Vec::<i32> = vec![0, 1];

    a.iter().map(|&x| x * 2).collect_into(&mut vec);
    a.iter().map(|&x| x * 10).collect_into(&mut vec);

    assert_eq!(vec, vec![0, 1, 2, 4, 6, 10, 20, 30]);

    let a = [1, 2, 3];
    let mut vec: Vec::<i32> = vec![0, 1];
    vec.extend(a.iter().map(|&x| x * 2));
    vec.extend(a.iter().map(|&x| x * 10));
    assert_eq!(vec, vec![0, 1, 2, 4, 6, 10, 20, 30]);
}
</code></pre>

---

<pre><code class="language-rust">
#![feature(iter_partition_in_place)]
fn main(){
    let mut a = [1, 2, 3, 4, 5, 6, 7];
    let c = a.iter_mut().partition_in_place(|&n| n % 2 == 0);   
    assert_eq!(c,3);
    for i in a.iter().take(c){ assert!(i % 2 == 0);}
    for i in a.iter().skip(c){ assert!(i % 2 != 0);}
}
</code></pre>
