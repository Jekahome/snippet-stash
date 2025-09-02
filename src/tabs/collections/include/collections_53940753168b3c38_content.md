


<pre><code class="language-rust">
fn main(){
    //singleton(value)  Построить вектор с одним значением
    let mut v = Vector::singleton(88);
     v.push_back(76);
    println!("{:?}",v);// [88, 76]
}
</code></pre>
