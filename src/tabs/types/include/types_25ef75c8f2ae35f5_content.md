


Более интересный пример: создание массива в compile-time
<pre><code class="language-rust">
const fn make_array(n: usize) -> [u32; 5] {
    let mut arr = [0; 5];
    let mut i = 0;
    while i < 5 {
        arr[i] = (i as u32) * (n as u32);
        i += 1;
    }
    arr
}

const RESULT: [u32; 5] = make_array(3);

fn main() {
    println!("{:?}", RESULT); // [0, 3, 6, 9, 12]
}
</code></pre>

---

const-инициализация через match:

<pre><code class="language-rust">

const fn classify(x: i32) -> &'static str {
    match x {
        n if n < 0 => "negative",
        0 => "zero",
        _ => "positive",
    }
}

const CATEGORY: &str = classify(-5);

fn main() {
    println!("Category: {}", CATEGORY); // "negative"
}

</code></pre>
