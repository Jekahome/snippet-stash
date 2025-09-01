


<pre><code class="language-rust">
fn main(){
    let my_string = String::from("hello");
    let my_bytes: Vec<u8> = my_string.into_bytes();

    let my_str: &str = "hello";
    let my_bytes: &[u8] = my_str.as_bytes();

    let my_vec = vec![104, 101, 108, 108, 111]; // "hello" в байтах
    let my_string = String::from_utf8(my_vec)
        .expect("Вектор байтов должен быть валидным UTF-8");

    use std::str;
    let my_slice: &[u8] = &[104, 101, 108, 108, 111];
    let my_str: &str = str::from_utf8(my_slice)
        .expect("Срез байтов должен быть валидным UTF-8");

}
</code></pre>
