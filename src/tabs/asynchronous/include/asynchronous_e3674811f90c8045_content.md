


<pre><code class="language-rust no_run edition2024">
fn main(){
    let mut file = ...;
    let mut channel = ...;
    let mut future = read_send(&mut file, &mut channel).fuse();
    pin_mut!(future);
    loop {
        futures::select! {
            _ => &mut future => {},
            some_data => socket.read_packet() => {
                // ...
            }
        }
    }
}
</code></pre>
