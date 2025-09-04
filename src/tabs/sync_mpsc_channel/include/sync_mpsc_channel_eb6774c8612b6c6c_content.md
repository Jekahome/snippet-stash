


<pre><code class="language-rust">
fn main(){
    let ms:fn(u64)->Duration = |ms| Duration::from_millis(ms);
    let r = crossbeam_channel::tick( ms(100) );

    println!("{:?}",r.recv().unwrap());// Instant { tv_sec: 15753, tv_nsec: 440847088 }
    std::thread::sleep(Duration::new(2, 0));
    println!("{:?}",r.recv().unwrap());//Instant { tv_sec: 15753, tv_nsec: 540949952 }
}
</code></pre>
