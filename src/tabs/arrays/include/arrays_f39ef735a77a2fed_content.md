


<pre><code class="language-rust">
fn main(){
    let a:[i32;6]=[1;6];// заполнение массива, 6 элементов, все единицы [1,1,1,1,1,1]

    let one = [1,2,3];
    let two: [u8; 3] = [1,2,3];
    let arrays = [one, two];
    let array: [i32; _] = std::array::from_fn(|i| i); // [0, 1, 2, 3, 4]
    let arr: [String; _] = array::from_fn(|i| format!("Element {}", i)); // ["Element 0", "Element 1", ...]

    // изменяемый
    let mut arr:[i32;20] = [7; 20];
    arr[1] = 9;

    use std::borrow::Borrow;
    // AsRef Borrow Default From
    let arr:[i32;32] = Default::default();// от 1 до 32
    // let arr:[i32;33] = Default::default();// Нет имплементации
    let arr:[i32;3] = From::from((1,2,3));
    let slice:&[i32] = arr.as_ref();
    let slice:&[i32] = arr.borrow();
}
</code></pre>
