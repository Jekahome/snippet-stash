


<pre><code class="language-rust">
fn main(){
 let bool_val:bool = true && false || false;
 assert!(!bool_val);

 assert_eq!(true as i32, 1);
 assert_eq!(false as i32, 0);

 match bool_val {
    true => println!("keep praising!"),
    false => println!("you should praise!"),
 }
}
</code></pre>
