


<pre><code class="language-rust">
struct SomeStruct;
impl Drop for SomeStruct {
    fn drop(&mut self) {
        if thread::panicking() {
            println!("dropped while unwinding");
        } else {
            println!("dropped while not unwinding");
        }
    }
}
fn main(){
    {
        print!("a: ");
        let a = SomeStruct;
    }
    {
        print!("b: ");
        let b = SomeStruct;
        panic!()
    }
}
</code></pre>
