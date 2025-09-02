


<pre><code class="language-rust">
fn main(){
    // get_mut(index) Изменчивое значение
    let mut v:Vector<String> = Vector::singleton("one".to_string());
    v.push_back("three".to_string());

    *v.get_mut(1).unwrap()="two".to_string();
    println!("{:?}",*v.get(1).unwrap());
}
</code></pre>
