


<pre><code class="language-rust">
use t::{T,R};
mod t{
    //#[repr(C)]
    #[derive(Debug)]
    pub struct T(u8,u8,u8);
    impl T{
        pub fn new(data:u8)->Self{
            Self(data,data,data)
        }
        pub fn get(&self)->&u8{
            &self.1
        }
    }
    //#[repr(C)] 
    #[derive(Debug)]
    pub struct R{data:u8,data2:u32,data3:u16 }
    impl R {
        pub fn new(data:u8)->Self{
            Self{data:data,data2:data as u32,data3:data as u16 }
        }
    }
}
fn main() {
    let t = T::new(8u8);
    let shared = &t;
    unsafe {
        let mutable = shared as *const T as *mut T;
         
        println!("read = {:?}",mutable.read());// read = T(8, 8, 8)
        // Установит все поля одним значением
        std::ptr::write_bytes(mutable, 255u8, 1);
        println!("{:p}\n{:X}\n{:?}",mutable,mutable as usize,*mutable);
        // 0x7ffeac8d5e98 
        // 7FFEAC8D5E98 
        // T(255, 255, 255)
        
        // Точечно можно попасть в поле если взять ссылку на значение
        let g:&u8 = t.get();
        let mutable = g as *const u8 as *mut u8;
        println!("read = {:?}",mutable.read());// read = 255
        *mutable = 72u8;
        println!("{:?}",t);// T(255, 72, 255)
        // Установить первые поля 
        let mutable2 = shared as *const T as *mut u8;
        std::ptr::write_bytes(mutable2, 30u8, 2); 
        println!("{:?}",t);// T(30, 30, 255)
        // Точечно можно попасть в поле
        let slice = std::ptr::slice_from_raw_parts_mut(mutable2,3);
        (*slice)[1] = 99u8;
        println!("{:?}",t);// T(30, 99, 255)
    }
    // #################################################################3
    
     let r = R::new(2u8);
     let shared = &r;
     unsafe {
        let mutable = shared as *const R as *mut u8;
        // Из-за того что структура R без #[repr(C)] т.е. данные выравниваются и первым становится поле data2:u32, вторым u16
        // Далее первые 4 байта это одно поле u32 self.data2
        // т.е. первый байт (*slice)[0] т.е. 8 бит это значения от 0-255
        let slice = std::ptr::slice_from_raw_parts_mut(mutable,7);// u32 4 байта + u8 1 байт + u16 2 байта = 7 байт
        (*slice)[0] = 0u8;// self.data2 u32 Если тут 1u8 = 1 (от 0-255)
        (*slice)[1] = 1u8;// self.data2 u32 Если тут 1u8 = 256 (от 256-65535)
        (*slice)[2] = 0u8;// self.data2 u32 Если тут 1u8 = 65536
        (*slice)[3] = 0u8;// self.data2 u32 Если тут 1u8 = 16777216 (В итоге 0000.0000.0000.0001.0000.0000=256 )
        (*slice)[4] = 2u8;// self.data3 u16 
        (*slice)[5] = 1u8;// self.data3 u16 Если тут 1u8 = 256 ( В итоге 0000.0001.0000.0010 =2+256=258)
        (*slice)[6] = 31u8;// self.data u8 ( В итоге 0001.1111 =1+2+4+8+16=31)
        println!("slice={:?} ",(*slice)[0] );
     }
     println!("R={:?}",r);// R { data: 31, data2: 256, data3: 258 }
     println!("size_of_val={:?}",std::mem::size_of_val(&r));//8
     println!("size_of={:?}",std::mem::size_of::<R>());//8
    println!("{:032b}\n{:09b}", 256u32,31u8);
}
</code></pre>
