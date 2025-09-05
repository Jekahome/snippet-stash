


<pre><code class="language-rust">
fn main(){
    thread::spawn(move || loop {
        let mut cmd = String::new();
        if io::stdin().read_line(&mut cmd).is_err() {
            println!("error");
            return;
        }
        if cmd == "start\n".to_string(){ 
           ...
        }   
    });
}
</code></pre>
