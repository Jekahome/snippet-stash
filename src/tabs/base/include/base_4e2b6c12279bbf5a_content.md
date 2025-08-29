


<pre><code class="language-rust">
fn main(){
//адрес  места в памяти
    let x = &42;
    let address = format!("{:p}", x);
    println!("{}",address);

    struct Length(i32);
    let l = Length(42);
    impl fmt::Pointer for Length {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            write!(f, "{:p}", self as *const Length)
        }
    }
    println!("l is in memory here: {:p}", l);
}
</code></pre>
