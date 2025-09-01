


<pre><code class="language-rust">
fn main(){
 let code_hex:Vec<u16> =  vec![0x52, 0x49, 0x46, 0x46];
 let decode:String = std::char::decode_utf16(code_hex)
    .map(|r| r.map_err(|e| e.unpaired_surrogate()))
    .map(|v| v.unwrap())
    .collect::<String>();
 assert_eq!("RIFF".to_string(),decode) ;
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
 let mut b = [0; 2];
 let result:&mut[u16] = '*'.encode_utf16(&mut b);
 assert_eq!(&[42],result);
 
 let s:char = std::char::from_u32(42).unwrap();
 assert_eq!('*',s);
 
 let code = &[0x2A].to_vec();
 let decode:String = std::char::decode_utf16(code.to_vec()) .map(|r| r.map_err(|e| e.unpaired_surrogate())) .map(|v| v.unwrap()).collect::<String>();
 assert_eq!("*",decode);
}
</code></pre>
