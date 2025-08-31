

Это быстрый и грязный трюк, который работает для этой демонстрации
Во-первых, давайте проверим, что толстый указатель действительно широкий:
<pre><code class="language-rust">
fn main(){
// Это даст нам 8, 16 и 16 соответственно на 64-битной машине. Так что указатели на трейт-объекты и срезы широкие.
    println!("{}", std::mem::size_of::<&String>());
    println!("{}", std::mem::size_of::<&[u8]>());
    println!("{}", std::mem::size_of::<&dyn X>());
}
</code></pre>


Первое слово в толстом указателе для типаж-объекта — это **адрес значения**, а второе — **адрес виртуальной таблицы** (для среза второе слово — **просто размер**).


Виртуальная таблица имеет следующий вид (все поля имеют размер слова):

```
pointer to drop_in_place
size
align
pointer to fn 1
pointer to fn 2
…
pointer to fn N
```

<pre><code class="language-rust">
trait Trait {
    fn do_something(&self);
    fn do_something_else(&self);
}
impl Trait for String {
    fn do_something(&self) { println!("a string: {}", self); }
    fn do_something_else(&self) { println!("a string: {}", self); }
}
impl Trait for u64 {
    fn do_something(&self) { println!("a u64: {}", self); }
    fn do_something_else(&self) { println!("a u64: {}", self); }
}
fn analyse_fatp<T: ?Sized>(p: *const T, datasize: usize, vtsize: usize) {
    let addr = &p as *const *const T as *const usize;
    let second = (addr as usize + std::mem::size_of::<usize>()) as *const usize;
    let datap = unsafe { *addr } as *const usize;
    let vtp = unsafe { *second } as *const usize;
    let data = unsafe { std::slice::from_raw_parts(datap, datasize) };
    let vtable = unsafe { std::slice::from_raw_parts(vtp, vtsize) };
    let vtable = vtable
        .iter()
        .map(|val| format!("0x{:x}", val))
        .collect::<Vec<_>>();

    println!("Addr of fat pointer (1st word): {:p}", addr);
    println!("Addr of fat pointer (2nd word): {:p}", second);
    println!("Addr of data:                   {:p}", datap);
    println!("Addr of vtable:                 {:p}", vtp);
    println!("Data:   {:?}", data);
    println!("VTable: {:?}", vtable);
}
fn main(){
    let obj: &dyn Trait = &String::from("hello");
    dbg!(String::do_something as *const ());
    dbg!(String::do_something_else as *const ());
    analyse_fatp(obj, std::mem::size_of::<String>() / std::mem::size_of::<usize>(), 5);

    let obj: &dyn Trait = &12_u64;
    dbg!(u64::do_something as *const ());
    dbg!(u64::do_something_else as *const ());
    analyse_fatp(obj, std::mem::size_of::<u64>() / std::mem::size_of::<usize>(), 5);
}
</code></pre>

**Мы получаем:**

```
[src/main.rs:38] String::do_something as *const () = 0x00005576c9fe48c0
[src/main.rs:39] String::do_something_else as *const () = 0x00005576c9fe4940
[src/main.rs:43] u64::do_something as *const () = 0x00005576c9fe49c0
[src/main.rs:44] u64::do_something_else as *const () = 0x00005576c9fe4a40

Addr of fat pointer (1st word): 0x7ffc1d178fd0
Addr of fat pointer (2nd word): 0x7ffc1d178fd8
Addr of data:                   0x7ffc1d179438
Addr of vtable:                 0x5576ca02a150
Data:   [93968711141840, 5, 5]
VTable: ["0x5576c9fdfa80", "0x18", "0x8", "0x5576c9fe48c0", "0x5576c9fe4940"]

Addr of fat pointer (1st word): 0x7ffc1d178fd0
Addr of fat pointer (2nd word): 0x7ffc1d178fd8
Addr of data:                   0x5576ca01a250
Addr of vtable:                 0x5576ca02a1f8
Data:   [12]
VTable: ["0x5576c9fdf9b0", "0x8", "0x8", "0x5576c9fe49c0", "0x5576c9fe4a40"]
```
