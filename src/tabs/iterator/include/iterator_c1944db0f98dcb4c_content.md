


<pre><code class="language-rust">
fn main(){
    let v = vec![1, 5];
    let mut iter = v.iter();                       
    loop {
        let value = iter.next();                   
        if value.is_some() {
            println!("value: {}", value.unwrap());
        } else {
            break;
        }
    }
}
</code></pre>
