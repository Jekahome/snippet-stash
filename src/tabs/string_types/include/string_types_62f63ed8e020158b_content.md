

Строка состоит из трех компонентов: указателя на некоторые байты, длины и емкости.
Умный указатель так как владеют некоторой памятью и позволяют вам манипулировать ею. 
Указатель указывает на внутренний буфер, используемый String для хранения своих данных.
Длина - это количество байтов, которые в настоящий момент хранятся в буфере, а емкость - это размер буфера в байтах.

* **указатель на некоторые байты - as_ptr**
* **длина - len**
* **емкость - capacity**

```rust
use std::mem;
fn main(){
  unsafe {
     let s = String::from("hello");
     let mut s = mem::ManuallyDrop::new(s);// Prevent automatically dropping the String's data
     let ptr = s.as_mut_ptr();
     let len = s.len();
     let capacity = s.capacity();
     let s = String::from_raw_parts(ptr, len, capacity);
     assert_eq!(String::from("hello"), s);
  }
}
```

---

```rust
fn main(){
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
            println!("{}", *ptr.add(i) );//[72, 101, 108, 108, 111]
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
}
```

