


<pre><code class="language-rust">
fn main(){
    let my_speed: Box<i32> = Box::new(88);
    let my_speed_ptr: *mut i32 = Box::into_raw(my_speed);
    unsafe {
       let mut my_speed_two: Box<i32> = Box::from_raw(my_speed_ptr);
       *my_speed_two+=1;
       println!("{:?}",my_speed_two);// 89
    }
    
   let my_speed_addr = my_speed_ptr as usize;// преобразовать необработанный указатель в целое число
   println!("address = {:X}", my_speed_addr);// 556BE0B489D0

   // Взяв на себя ответственность за оригинальный `Box <T>`, мы обязаны собрать его позже, чтобы он был уничтожен.
    unsafe {
        drop(Box::from_raw(my_speed_ptr));
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let my_num: Box<i32> = Box::new(10);
    let my_num_ptr: *const i32 = &*my_num;

    let mut my_speed: Box<i32> = Box::new(88);
    let my_speed_ptr: *mut i32 = &mut *my_speed;
}
</code></pre>
