

Отличие `&T , &mut T` от `*const T, *mut T` 

`&T , &mut T` - **Ссылки (указывает на объект который точно есть)**

не может быть NULL
гарантирует, что объект жив
<pre><code class="language-rust">
fn main(){
    let mut x: i32 = 92;
    let r: &mut i32 = &mut 92; // явное взятие ссылки
    *r += 1; // явное разыменовывание ссылки
}
</code></pre>


`*const T, *mut T` - **Указатели (указывает куда-то в память)**

* могут быть NULL
*не гарантируют, что объект жив
*разыменовывание указателя— unsafe операция
*встречаются редко (и продвинутые структуры данных)

---

<pre><code class="language-rust">
fn main(){
    let my_num: i32 = 10;
    let my_num_ptr: *const i32 = &my_num;

    let mut my_speed: i32 = 88;
    let my_speed_ptr: *mut i32 = &mut my_speed; 

// Чтобы получить указатель на значение в Box, разыменуйте поле:

    let my_num: Box<i32> = Box::new(10);
    let my_num_ptr: *const i32 = &*my_num;

    let mut my_speed: Box<i32> = Box::new(88);
    let my_speed_ptr: *mut i32 = &mut *my_speed;
}
</code></pre>
