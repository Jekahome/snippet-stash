


<pre><code class="language-rust">
fn main() {
   let mut buff = String::new(); // String это Clone (если взять Copy то number просто скопируется в замыкание)
   {
        let mut plus_two = move |x:&str| { // move забрал во владение buff
            buff.push_str(x);
            println!("{:?}", &buff);  
        };
        plus_two("ss");
    }
   // println!("{:?}", &buff); // Error: borrow of moved value: `buff`
}
</code></pre>
