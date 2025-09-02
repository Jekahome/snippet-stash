


<pre><code class="language-rust">
use std::pin::Pin;

struct MyStruct {
  value: u32,
  _pin: PhantomPinned,
}

fn main() {
  let mut my_struct: Pin<Box<MyStruct>> = Box::pin(MyStruct {
    value: 10,
    _pin: PhantomPinned,
  });
  println!("{}", my_struct.value);
  unsafe {
    let mut_ref: Pin<&mut MyStruct> = Pin::as_mut(&mut my_struct);
    let mut_pinned: &mut MyStruct = Pin::get_unchecked_mut(mut_ref);
    mut_pinned.value = 32;
  }
  println!("{}", my_struct.value);
}
</code></pre>
