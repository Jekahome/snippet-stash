


<pre><code class="language-rust">
fn main(){
    let mut vec = Vec::with_capacity(10);  
    // AsRef<[T]> 
    let slice:&[i32] = vec.as_ref();
    // AsMut<[T]>
    let m_slice:&mut [i32] = vec.as_mut(); 

    // Deref 
    let slice:&[i32] = &vec;
    // DerefMut
    let m_slice:&mut [i32] = &mut vec; 

    use std::borrow::Borrow;
    use std::borrow::BorrowMut;
    // Borrow<[T]>
    let slice:&[i32] = vec.borrow();
    // BorrowMut<[T]>
    let m_slice:&mut [i32] = vec.borrow_mut();

    // Extend<&'a T> ,  Extend<T>
    vec.extend([1,2,3]);
    vec.extend(vec![1,2,3]);

    use std::io::Write;
    let mut buf = vec![1u8,2,3];
    let _ = buf.write(&[1u8,2,3]);

    // From<&str> for Vec<u8, Global>
    let vec:Vec<u8> = Vec::from("123");
    let vec:Vec<u8> = "123".into();
    // From<&[T]> for Vec<T, Global>
    let vec:Vec<i32> = Vec::from([1,2,3]);
}
</code></pre>
