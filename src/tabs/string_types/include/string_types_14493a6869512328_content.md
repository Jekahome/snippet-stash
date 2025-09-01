


<pre><code class="language-rust">
fn main(){
    let bytes:&[u8] = "bors".as_bytes();
    assert_eq!([98, 111, 114, 115],bytes);

    let bytes2 =b"bors";
    assert_eq!(bytes2, bytes);

    // Чтобы преобразовать байтовый фрагмент обратно в срез строки, используйте функцию str::from_utf8
    let bytes = std::str::from_utf8(&bytes);     // https://doc.rust-lang.org/beta/std/str/fn.from_utf8.html
    println!("bytes = {}",bytes.unwrap());// bors
}
</code></pre>

<pre><code class="language-rust">
fn main(){
    let b:&[u8] = b"some bytes";
    let b:Vec<u8> = vec![115, 111, 109, 101, 32, 98, 121, 116, 101, 115];
    let b:&[u8] = "some bytes".as_bytes();
    let b:Vec<u8> = String::from("some bytes").into_bytes();
    println!("{:?}",b);// [115, 111, 109, 101, 32, 98, 121, 116, 101, 115]

    println!("{}",if let Ok(result)=std::str::from_utf8(&b){result}else {""});
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut buf = String::from("🗻∈🌏");
    let s:&mut str = buf.as_mut();
    unsafe {
        let  bytes:&mut[u8] = s.as_bytes_mut();
        bytes[0] = 0xF0;
        bytes[1] = 0x9F;
        bytes[2] = 0x8D;
        bytes[3] = 0x94;
    }
    Обратное преобразование:
    unsafe {
        let mut mut_s:&mut str = std::str::from_utf8_mut(bytes).unwrap();
        println!("mut_s = {}",mut_s);
    }
    println!("s = {}",s);// 🍔∈🌏
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut bytes = "bors".bytes();
    while let  Some( mut s) = bytes.next(){
        print!("{} ", s);// 98 111 114 115
    }
    // ------------------------------------------------------
    let s = "this is a string";
    let boxed_str:Box<str> = s.to_owned().into_boxed_str();
    let boxed_bytes:Box<[u8]> = boxed_str.into_boxed_bytes();
    println!("{:?} \n{:?}",boxed_bytes, s.as_bytes());
}
</code></pre>
