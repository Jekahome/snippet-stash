


<pre><code class="language-rust">
fn main(){
    let mut v:Vec<i32> = vec![0,0,0,0];
    /*thread::spawn(/*move*/ || { // в таком виде только через перемещение вектора но после потока вектора уже не будет
            v.push(1);
            println!("{:?}",v);
      }).join();*/
     
    crossbeam::scope(|scope_|{
        for i in v.iter_mut(){
          scope_.spawn(move || {
               *i=1; 
          }).join();
        }
    });
    println!("{:?}",v);
}
</code></pre>
