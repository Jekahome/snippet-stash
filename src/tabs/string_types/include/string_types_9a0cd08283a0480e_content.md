


<pre><code class="language-rust">
fn get_static(s: String) -> (&'static str,*mut String){
    let my_speed: Box<String> = Box::new(s);
    let my_speed_ptr: *mut String = Box::into_raw(my_speed);
 
    unsafe {
        let my_speed_two: Box<String> = Box::from_raw(my_speed_ptr);
        let static_ref: &'static mut String = Box::leak(my_speed_two);
       
        (*static_ref).push_str(" World!");
       
        (static_ref,my_speed_ptr)
    }
}
fn main(){
    let s = String::from("Hello ");
    let (static_str,my_speed_ptr):(&'static str,*mut String) = get_static(s);
    println!("{}",static_str);
    unsafe {
         drop(Box::from_raw(my_speed_ptr));
    }
}
</code></pre>
