

Simple usage:
```rust
fn main() {
    let x:Box<usize>  = Box::new(41);
    let static_ref: &'static mut usize = Box::leak(x);
    *static_ref += 1;
    assert_eq!(*static_ref, 42);
} 
```

---

Unsized data:
```rust
fn main() {
    let x:Box<[i32]> = vec![1, 2, 3].into_boxed_slice();
    let static_ref:&mut [i32] = Box::leak(x);
    static_ref[0] = 4;
    assert_eq!(*static_ref, [4, 2, 3]);
}
```

---

```rust
fn main(){
#[wasm_bindgen(skip)]
#[derive(Debug)]
pub struct Hand ( &'static str);

#[wasm_bindgen]
impl Hand {
    pub fn new( key:&str)->Self{
        Hand(
            Box::leak(String::from(key).into_boxed_str())
        ) 
    }
}
}
```

---

```rust
fn get_static(s: String) -> (&'static str,*mut String){
    let my_speed: Box<String> = Box::new(s);
    let my_speed_ptr: *mut String = Box::into_raw(my_speed);
 
    unsafe {
        let mut my_speed_two: Box<String> = Box::from_raw(my_speed_ptr);
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
```


