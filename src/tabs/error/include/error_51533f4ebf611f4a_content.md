


<pre><code class="language-rust">
// простая обработка
fn test_map_easy(var:Result<i32,&'static str>)->Result<i32,&'static str>{
     var
          .map(|numb| numb+1 )
          .map_err(|_| "var == Err")
          .and_then(|numb| Ok(numb + 1) )
          .map(|numb| numb + 1 )
}
fn main(){
    let var:Result<i32,&'static str> = Ok(1);
    assert_eq!(4,test_map_easy(Ok(1)).unwrap());
}
</code></pre>
 
---

<pre><code class="language-rust">
fn main(){
    let x: Result<_, &str> = Ok("foo");
    assert_eq!(x.map_or(42, |v| v.len()), 3);

    let x: Result<&str, _> = Err("bar");
    assert_eq!(x.map_or(42, |v| v.len()), 42);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let k = 21;

    let x : Result<_, &str> = Ok("foo");
    assert_eq!(x.map_or_else(|e| k * 2, |v| v.len()), 3);

    let x : Result<&str, _> = Err("bar");
    assert_eq!(x.map_or_else(|e| k * 2, |v| v.len()), 42);
}
</code></pre>
