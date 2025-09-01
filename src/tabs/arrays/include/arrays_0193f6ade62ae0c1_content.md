


<pre><code class="language-rust">
fn main(){
    let var:u64 = 144u64;
    let bytes = var.to_be_bytes();
    let complete:&[u8]=&bytes[..8];
          
    let mut array = [0u8; 8];
    for (&x, p) in complete.iter().zip(array.iter_mut()) {
        *p = x;
    }
    assert_eq!(u64::from_be_bytes(array),var );
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
use std::convert::AsMut;

fn make_array<A, T>(slice: &[T]) -> A
    where A: Sized + Default + AsMut<[T]>,
          T: Copy
{
    let mut a = Default::default();
    // the type cannot be inferred!
    // a.as_mut().copy_from_slice(slice);
    <A as AsMut<[T]>>::as_mut(&mut a).copy_from_slice(slice);
    a
}

fn main(){
 let original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let a: [u8; 4] = make_array(&original[0..4]);
    println!("{:?}", a);// [1, 2, 3, 4]
}
}
</code></pre>
