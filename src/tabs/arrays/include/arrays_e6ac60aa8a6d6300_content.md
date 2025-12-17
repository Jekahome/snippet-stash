

<pre><code class="language-rust">
fn main(){
    //reverse_array 
     
    let mut arr = vec![1,2,3,4,5];
    let mut first: usize = 0;
    let mut last: usize = arr.len()-1;
    
    while first < last {
        // inplace swap  
        /*
        arr[last] = arr[first] ^ arr[last];  
        arr[first] = arr[first] ^ arr[last];  
        arr[last] = arr[first] ^ arr[last]; 
        */
        // безопасный вариант через swap
        arr.swap(first, last);
        
        first+=1;
        last-=1;
    }
    println!("{:?}",arr);// [5, 4, 3, 2, 1]
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut to = [0, 0];
    let mut from = [1, 2, 3, 4];
    to.swap_with_slice(&mut from[2..]); // количество 2 равно длине приемника
    assert_eq!(to, [3, 4]);
    assert_eq!(from, [1, 2, 0, 0]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [1, 2, 3];
    v.reverse();
    assert!(v == [3, 2, 1]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let v = &[10, 40, 30];
    assert_eq!(v.strip_prefix(&[10]), Some(&[40, 30][..]));
    assert_eq!(v.strip_prefix(&[10, 40]), Some(&[30][..]));
    assert_eq!(v.strip_prefix(&[50]), None);
    assert_eq!(v.strip_prefix(&[10, 50]), None);
    let prefix : &str = "he";
    assert_eq!(b"hello".strip_prefix(prefix.as_bytes()),Some(b"llo".as_ref()));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    unsafe {
        let bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
        let (prefix, shorts, suffix) = bytes.align_to::<u16>();
        let mut bytes: [u8; 7] = [1, 2, 3, 4, 5, 6, 7];
        let (prefix, shorts, suffix) = bytes.align_to_mut::<u16>();
    }
}
</code></pre>
