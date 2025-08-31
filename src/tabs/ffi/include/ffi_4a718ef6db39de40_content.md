


<pre><code class="language-rust">
extern crate libc;
use libc::size_t;
use std::fs::File;
use std::io::Read;
// Обьявление C функций
extern {
    fn write_easy(content:*mut u8,count_buff:libc::size_t);
}
const COUNT_BUFF:usize = 10;
fn write(){
    let content_ptr: *mut u8 = std::ptr::null_mut(); 
    // used Vec
    if true {
        let mut content: Vec<u8> =Vec::with_capacity(COUNT_BUFF);
        for i in 0..COUNT_BUFF{
            content.push(i as u8);
        }
        println!("Исходный массив:");
        for i in 0..COUNT_BUFF{
            println!("value={:?}",content[i]); 
        }
        let content_ptr: *mut u8 = content.as_mut_ptr();
        unsafe{
             println!("\nИзменим массив (из ptr):");
             for i in 0..COUNT_BUFF{
                 std::ptr::write(content_ptr.offset(i as isize), 12 + i as u8);
                 println!("addr={:p}, value={}",content_ptr,std::ptr::read(content_ptr.offset(i as isize)));
             } 
             write_easy(content_ptr,COUNT_BUFF);
         }
        println!("\nИзменения из FFI:");
        for i in 0..COUNT_BUFF{
            println!("addr={:p}, value={:?}",content_ptr,content[i]); 
        }
    }   
    // used Array
    if false {
        let mut content:[u8;COUNT_BUFF]=[0;COUNT_BUFF];
        for i in 0..COUNT_BUFF{
            content[i] = i as u8;
        }
        println!("Исходный массив:");
        for i in 0..COUNT_BUFF{
            println!("value={:?}",content[i]); 
        }
        let content_ptr: *mut u8 = &mut content[0] as *mut u8;
        unsafe{
             println!("\nИзменим массив (через ptr):");
             for i in 0..COUNT_BUFF{ 
                 std::ptr::write(content_ptr.offset(i as isize), 12 + i as u8);
                 println!("addr={:p}, value={}",content_ptr,std::ptr::read(content_ptr.offset(i as isize)));   
             }
             write_easy(content_ptr,COUNT_BUFF);
         }
         println!("\nИзменения из FFI:");
         for i in 0..COUNT_BUFF{
             println!("addr={:p}, value={:?}",content_ptr,content[i]); 
         }
    }
    // used slice 
    if true {
        let mut content: Vec<u8> =Vec::with_capacity(COUNT_BUFF);
        for i in 0..COUNT_BUFF{
            content.push(i as u8);
        }
        unsafe fn wrap(src:&[u8]){
            write_easy(src.as_ptr() as *mut u8, src.len() as size_t);
        }
        unsafe { 
            wrap(&content);
        } 
    }
}
fn read() -> std::io::Result<()> {
    let mut f = File::open("src/OUT.raw").unwrap();//открыть только для чтения
    let mut buffer:std::vec::Vec<u8> = Vec::with_capacity(50);
    f.read_to_end(&mut buffer)?;
    println!("Получил обратно массив (через файл):");
    println!("{:#?}",buffer);
    Ok(())
}
fn main() { 
    write();
    read();
}
</code></pre>



<details>
<summary>Вывод</summary>

```
Вывод:
Исходный массив:
value=0
value=1
value=2
value=3
value=4
value=5
value=6
value=7
value=8
value=9

Изменим массив (из ptr):
addr=0x555786d07ad0, value=12
addr=0x555786d07ad0, value=13
addr=0x555786d07ad0, value=14
addr=0x555786d07ad0, value=15
addr=0x555786d07ad0, value=16
addr=0x555786d07ad0, value=17
addr=0x555786d07ad0, value=18
addr=0x555786d07ad0, value=19
addr=0x555786d07ad0, value=20
addr=0x555786d07ad0, value=21

Пришел массив с++:
addr=0x555786d07ad0, value=12
addr=0x555786d07ad1, value=13
addr=0x555786d07ad2, value=14
addr=0x555786d07ad3, value=15
addr=0x555786d07ad4, value=16
addr=0x555786d07ad5, value=17
addr=0x555786d07ad6, value=18
addr=0x555786d07ad7, value=19
addr=0x555786d07ad8, value=20
addr=0x555786d07ad9, value=21

Изменения из FFI:
addr=0x555786d07ad0, value=13
addr=0x555786d07ad0, value=14
addr=0x555786d07ad0, value=15
addr=0x555786d07ad0, value=16
addr=0x555786d07ad0, value=17
addr=0x555786d07ad0, value=18
addr=0x555786d07ad0, value=19
addr=0x555786d07ad0, value=20
addr=0x555786d07ad0, value=21
addr=0x555786d07ad0, value=22

Получил обратно массив:
[
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
]
```
</details>
