


<pre><code class="language-rust">
fn main(){
    fn size_of<T>() -> usize{1}// неявный where T: Sized
    // выключим bount trait Sized , передача только по ссылке так как размера не знаем
    fn size_of_val<T: ?Sized + std::fmt::Display>(val: &T) -> usize{
       println!("{}",val);
       1
    }
    // включим bount trait Sized, передача и через ссылку и по значению так как знаем размер
    fn size_of_val2<T: Sized  + std::fmt::Display>(val: T, val_ref: &T) -> usize{
       println!("{}",val);
     1
    }
    size_of_val(&1_usize);
    size_of_val2(1_usize,&1_usize);
}
</code></pre>
