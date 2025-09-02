

В Rust, когда объект обернут в Pin, он не может быть перемещен в памяти, пока он "закреплен". 

Однако, когда Pin умирает (то есть выходит из области видимости и больше не существует), ограничения Pin больше не применяются. 
<pre><code class="language-rust">
use std::pin::Pin;
use std::marker::PhantomPinned;

struct MyStruct {
    value: i32,
    _marker: PhantomPinned, // Указывает, что MyStruct не реализует Unpin
}

impl MyStruct {
    fn new(value: i32) -> Pin<Box<MyStruct>> {
        Box::pin(MyStruct { value, _marker: PhantomPinned })
    }
}

fn main() {
    let mut pinned_value: Pin<Box<MyStruct>> = MyStruct::new(10);

    // pinned_value не может быть перемещен в памяти
    let value_ref: &i32 = &pinned_value.as_ref().get_ref().value;
    println!("Pinned value: {}", value_ref);

    // pinned_value выходит из области видимости и уничтожается
    {
        let mut unpinned_value = Box::new(MyStruct { value: 20, _marker: PhantomPinned });
        // unpinned_value может быть перемещен, так как он не обернут в Pin
        let value_ref: &i32 = &unpinned_value.value;
        println!("Unpinned value: {}", value_ref);
    }

    // После этого pinned_value больше не существует, и его ограничения не применяются
}
</code></pre>
