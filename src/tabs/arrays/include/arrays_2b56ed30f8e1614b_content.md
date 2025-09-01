


<pre><code class="language-rust">
fn main(){
    let buf:Vec<u8> = vec![1;8];
    let mut arr: [u8; 8] = buf[..8].try_into().unwrap();
    let mut arr: [u8; 8] = TryFrom::try_from(buf).unwrap();
    let mut arr: [u8; 8] = <[u8; 8]>::try_from(buf).unwrap();

     # или     
    let [b1,b2,b3,b4,b5,b6,b7,b8,..] = buf[..] else { todo!() };
    let mut arr:[u8;8] = From::from((b1,b2,b3,b4,b5,b6,b7,b8));

     # или      
    const size:usize = 8;
    let mut arr:[u8;size]= todo!();
    for (i,v) in buf.iter().take(size).enumerate(){
          arr[i]=*v;
    }
}
</code></pre>

---
 
<pre><code class="language-rust">
use std::convert::TryInto;
fn main(){
    const N:usize = 3;
    let v:Vec<String> = vec!["..".to_string()];
    let arr:[String;N] = v.try_into().unwrap_or_else(|v: Vec<String>| panic!("Expected a Vec of length {} but it was {}", N, v.len()));
    for item in arr.iter() {
        let x: &String = item;
        println!("{x}");
    }
}
</code></pre>
