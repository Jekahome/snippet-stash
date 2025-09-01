


<pre><code class="language-rust">
fn main(){
    let b:&[u8] = b"some bytes";
    let b:Vec<u8> = vec![115, 111, 109, 101, 32, 98, 121, 116, 101, 115];
    let b:&[u8] = "some bytes".as_bytes();
    let b:Vec<u8> = String::from("some bytes").into_bytes();
    println!("{:?}",b);// [115, 111, 109, 101, 32, 98, 121, 116, 101, 115]
   // обратно в &str
   let result:&str = std::str::from_utf8(&b).unwrap();
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
   let mut s = String::from("hello");
    unsafe {
        let vec = s.as_mut_vec();
        assert_eq!(&[104, 101, 108, 108, 111][..], &vec[..]);
        vec.reverse();
    }
    assert_eq!(s, "olleh");
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    use std::boxed::Box;
    let s = String::from("hello");
    let b:Box<str> = s.into_boxed_str();

     let s = String::from("hello");
     let my_string:Box<String> = Box::new(s);

    print_if_string(my_string);

    fn print_if_string(value: Box<std::any::Any>) {
        if let Ok(string) = value.downcast::<String>() {
            println!("String ({}): {}", string.len(), string);
        }
    }
}
</code></pre>
