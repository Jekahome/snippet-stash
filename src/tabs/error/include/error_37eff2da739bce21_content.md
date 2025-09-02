


<pre><code class="language-rust">
fn main(){
    // Для типов в стеке copied() и cloned()
    let source = Some(&12);
    let r = source.copied().unwrap_or(0);
    let r2 = source.cloned().unwrap_or(0);
    println!("{r} {r2}");
     
    // Для типов в куче только cloned()
    let v = vec![1,2,3]; 
    let source = Some(&v); 
    let r = source.cloned().unwrap_or(v);
    println!("{:?}",r);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Option<Option<u32>> = Some(Some(6));
    let x: Option<u32> = x.flatten()); // Some(6)
}
</code></pre>
