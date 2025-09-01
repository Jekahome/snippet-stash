


<pre><code class="language-rust">
trait Trait {
    fn method(&self) {}
}
impl Trait for str {
    // теперь можно вызвать "метод" на
    // 1) str or
    // 2) String since String: Deref<Target = str>
}
impl<T> Trait for [T] {
    // теперь можно вызвать "метод" на
    // 1) any &[T]
    // 2) any U where U: Deref<Target = [T]>, e.g. Vec<T>
    // 3) [T; N] for any N, since [T; N]: Unsize<[T]>
}
fn str_fun(s: &str) {}
fn slice_fun<T>(s: &[T]) {}

fn main() {
    let str_slice: &str = "str slice";
    let string: String = "string".to_owned();

    // function args
    str_fun(str_slice);
    str_fun(&string); // deref приведение

    // method calls
    str_slice.method();
    string.method(); // deref приведение

    let slice: &[i32] = &[1];
    let three_array: [i32; 3] = [1, 2, 3];
    let vec: Vec<i32> = vec![1];

    // function args
    slice_fun(slice);
    slice_fun(&vec); // deref приведение
    slice_fun(&three_array); // безразмерное приведение

    // method calls
    slice.method();
    vec.method(); // deref приведение
    three_array.method(); // безразмерное приведение
}
</code></pre>
