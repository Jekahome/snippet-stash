


<pre><code class="language-rust">
fn main(){
    #[derive(Debug)]
    struct A(pub i32);
    let a = A(8);
    let ref_var = &Some(a);
    // Для &Option<T> нет методов, для преобразования в Option<&T> используем as_ref
    // let value = ref_var.and_then(|v|Some(v.0)); ERROR:cannot move out of borrowed content
    let value = ref_var.as_ref().and_then(|v|Some(v.0)).map(|v|{v+1});
    assert_eq!(Some(9),value);

    let x: Result<u32, &str> = Ok(2);
    assert_eq!(x.as_ref(), Ok(&2));

    let x: Result<u32, &str> = Err("Error");
    assert_eq!(x.as_ref(), Err(&"Error"));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    fn mutate(r: &mut Result<i32, i32>) {
        match r.as_mut() {
            Ok(v) => *v = 42,
            Err(e) => *e = 0,
        }
    }

    let mut x: Result<i32, i32> = Ok(2);
    mutate(&mut x);
    assert_eq!(x.unwrap(), 42);

    let mut x: Result<i32, i32> = Err(13);
    mutate(&mut x);
    assert_eq!(x.unwrap_err(), 0);
}
</code></pre>
