


<pre><code class="language-rust">
use bytes::{Bytes,BytesMut};
use std::convert::{From,TryFrom};
#[derive(Debug)]
struct Number(usize);
/* impl From<Bytes> for Number {
    fn from(item: Bytes) -> Self {
     let v =  item.into_iter().collect::<Vec<u8>>();
     Number(usize::from_be_bytes(v.try_into().unwrap()))
    }
} */
impl TryFrom<Bytes> for Number {
    type Error = String;
    fn try_from(item: Bytes) -> Result<Self, Self::Error> {
        let v = item.into_iter().collect::<Vec<u8>>();
        match v.try_into() {
            Ok(arr) =>{ Ok(Number(usize::from_be_bytes(arr))) },
            Err(e) => { Err(format!("{:?}",e)) }
        }
    }
}
fn main() {
    let n:u128 = 478;
    let arr:[u8; 16] = n.to_be_bytes();
    
    let n:usize = 478;
    //println!("size of `n` in bytes: {}", std::mem::size_of_val(&n));//8
    let arr:[u8; 8] = n.to_be_bytes();
    println!("{:?}",arr);// [0, 0, 0, 0, 0, 0, 1, 222]
    {
        let v:Vec<u8> = arr.to_vec();
        let b:Bytes = Bytes::from(v);
        println!("{:?}",b);// b"\0\0\0\0\0\0\x01\xde"
        
       //  Number::from(b);
       if let Ok(n) = Number::try_from(b){
           println!("n={:?}",n.0);
       }
    }
    {
        let mut b:BytesMut = BytesMut::with_capacity(64);
        b.extend_from_slice(&arr);
        let b_not_mut:Bytes = b.freeze();
        let v:Vec<u8> = arr.to_vec();
        let b:Bytes = v.into();
        println!("{:?}", b);// b"\0\0\0\0\0\0\x01\xde"
    }
    let a:Bytes = Bytes::from(&b"hello world"[..]);
    println!("{:?}",a);// b"hello world"
    
    let value:usize = usize::from_be_bytes([0, 0, 0, 0, 0, 0, 1, 222]);
    println!("{:?}",value);
    
    let b:[u8;8] = usize::to_be_bytes(n);
    println!("{:?}",b);
    
    /*  b.extend_from_slice(&arr);
    println!("{:?}", b);// b"\0\0\0\0\0\0\x01\xde"
    let mut b_not_mut = b.freeze();
    let arr:&[u8] = &*b_not_mut;
    
    unsafe{
        let s:String = String::from_utf8_unchecked(arr.to_vec());
        println!("{}", s);// муть :)))
    } */
}
</code></pre>
