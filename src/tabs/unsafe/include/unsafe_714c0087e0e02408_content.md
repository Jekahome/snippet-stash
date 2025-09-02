


<pre><code class="language-rust">
#[derive(Clone,Debug)] 
struct Foo(i32);
/* impl Drop for Foo {fn drop(&mut self) { println!("exit"); }} */

// без необработанного указателя нельзя вернуть ссылку на локальную переменную
// таким образом мы обходим ограничение что-бы сработал деструктор локального обьекта
fn test_ptr() -> *mut Foo{
  let mut local_foo = Foo(2);
  let var_ref = &mut local_foo;  
  let var_ref_raw_ptr = var_ref as *mut Foo;
  unsafe{ 
    (*var_ref_raw_ptr).0+=1i32;
    println!("befor drop foo = {:?} addr:{:p}", *var_ref_raw_ptr,var_ref_raw_ptr);
  }
   var_ref_raw_ptr
}

fn main() {
 // При взятии необработанного указателя, на программиста возлагается ответственность освободить память 
 // Но так как мы закоментировали реализацию Drop для Foo то после выхода из области видимости локальной переменной local_foo
 // память не освобождается и мы можем использовать через ее адресс ее данные
  let ptr = test_ptr();
  unsafe{ 
   println!("after drop foo = {:?} addr:{:p}", *ptr,ptr);
   assert_eq!(3,(*ptr).0);
  }
  //println!("address = {:X}", ptr as usize);// 7FFC8F9C8FF0
  //println!("address = {:p}", ptr );// 0x7ffc8f9c8ff0

  let foo:&Foo = unsafe{ &*ptr };
  println!("foo = {:?}", foo );
  assert_eq!(3,(*foo).0); 
   
//String
   let mut s:String = "Hello".to_string();
   let mut s = std::mem::ManuallyDrop::new(s);// Так как реализация Drop уже есть, то нам нужно запретить автоматическое удаление данных
   
   let ptr:*mut u8 = s.as_mut_ptr();
   let len = s.len();
   let capacity = s.capacity();
    
    unsafe{
        for i in 0..len{
           // мутируем строку
           // изменим регистр первого символа с H => h
            *ptr.add(0) = *(String::from_utf8(vec!(*ptr.add(0))).unwrap()).to_ascii_lowercase().as_bytes().first().unwrap();
            println!("{}", *ptr.add(i) );
        }
    }
    println!("address = {:p}", ptr );
   
   // Восстановление строки
    let s = unsafe {
        let v:Vec<u8> = Vec::from_raw_parts(ptr, s.len(),s.capacity());
        //println!("{:?}", v );//[72, 101, 108, 108, 111]
        String::from_utf8( v ).unwrap()
    };
    assert_eq!(String::from("hello"), s);
    
   // или так
   let s = unsafe { String::from_raw_parts(ptr, len, capacity) } ;
   assert_eq!(String::from("hello"), s);

// Vec
    let mut my_vec: Vec<i32> = vec![-1, 2, 3];
    let my_vec_ptr = my_vec.as_mut_ptr();// получить необработанный указатель указателя на данные
    let (len,cap) = (3,3);
    //let (my_vec_ptr, len, cap) = my_vec.into_raw_parts();// получить необработанный указатель указателя на данные, емкость и длину 
    let new_vec: Vec<i32> = unsafe{
        // можем мутировать данные
        for i in 0..len as i32 {
            std::ptr::write(my_vec_ptr.offset(i as isize), 4 + i);
        }
        // или так
        *my_vec_ptr.add(2) = 222_i32;
        // отдадим необработанный указатель обратно для освобождения занимаемой им памяти после выхода из области видимости (RAII)  
        Vec::from_raw_parts(my_vec_ptr, len,cap)
    };
    println!("new_vec = {:?}", new_vec);// [4, 5, 222]
    let my_vec_addr = my_vec_ptr as usize;// преобразовать необработанный указатель в целое число
    println!("address = {:X}", my_vec_addr);// 556BE0B489D0

// Box
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
