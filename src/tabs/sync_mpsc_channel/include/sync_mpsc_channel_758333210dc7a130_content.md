


<pre><code class="language-rust">
fn main(){
    let mut v:Vec<i32> = vec![];
    crossbeam::scope(|scope_|{
          let mut v2 = &mut v;
          scope_.spawn(move || {
               v2.push(1);
          }).join();
        
    });
    assert_eq!(1,v[0]); // println!("{:?}",v);
}
</code></pre>
