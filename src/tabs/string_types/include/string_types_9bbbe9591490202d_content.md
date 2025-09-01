


<pre><code class="language-rust">
fn main(){
   let sparkle_heart = vec![240, 159, 146, 150];
    unsafe{ println!("{}", String::from_utf8_unchecked(sparkle_heart)); }
    let mut sparkle_heart = vec![240, 159, 146, 150,999999999];
    let mut sparkle_heart = vec![240, 159, 146, 150];
     //if let Ok(i) = String::from_utf8(sparkle_heart){ println!("{}",i); }
    match String::from_utf8(sparkle_heart) {
        Ok(i) => {
            println!("{}", i);
            println!("as_bytes {:?}",i.as_bytes());// [240, 159, 146, 150]
        },
        Err(e) => println!("Error:{}", e)
    }
    let sparkle_heart = vec![240, 159, 146, 150];
    let sparkle_heart:std::borrow::Cow<str>  = String::from_utf8_lossy(&sparkle_heart);
    println!("from_utf8_lossy={}", sparkle_heart);
    //некоторые недопустимые байты
    let input = b"Hello \xF0\x90\x80World";
    let output:std::borrow::Cow<str> = String::from_utf8_lossy(input);
    println!("from_utf8_lossy={}", output);
// ---------------------------------------------------------------------------

    assert_eq!("111".to_owned(),String::from_utf8((&[49,49,49]).to_vec()).unwrap()); // через владение
    assert_eq!("111" ,std::str::from_utf8(&[49,49,49]).unwrap()); // без владения
}
</code></pre>

---
 
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
