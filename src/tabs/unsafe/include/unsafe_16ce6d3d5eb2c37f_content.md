


<pre><code class="language-rust">
#[derive(Clone,Debug)] 
struct Foo(i32);
/*
impl Drop for Foo {
    fn drop(&mut self) {
        println!("exit");
    }
}
*/

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
 // память не освобождается и мы можем использовать ее данные через ее адресс
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
}
</code></pre>
