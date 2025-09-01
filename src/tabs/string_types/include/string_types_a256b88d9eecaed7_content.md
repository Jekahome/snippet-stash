


<pre><code class="language-rust">
fn main(){
    use std::mem;
    let story = "Once upon a time...";

    let ptr:*const u8 = story.as_ptr();
    let len:usize = story.len();
    let capacity:usize = story.len();

    // story has nineteen bytes
    assert_eq!(19, len);

    // Теперь, когда у нас есть компоненты (ptr,len,capacity), мы удаляем story.
    mem::forget(story);

    // Мы можем создать строку из ptr, len и capacity. 
    // Это все небезопасно, потому что мы несем ответственность за действительные компоненты  (ptr,len,capacity)
    let s:String = unsafe { String::from_raw_parts(ptr as *mut _, len, capacity) } ;

    assert_eq!(String::from("Once upon a time..."), s);
}
</code></pre>
