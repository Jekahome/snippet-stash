

С плавающей точкой `f32` (4 байта), `f64` (8 байт)
 
<pre><code class="language-rust">
fn main(){
    let d:f64 = 111.55555555555559; // двойная точность
    let f:f32 = 111.55556; // одинарная точность
    print!("float {}\n double {}\n",f,d);

// По умолчанию создается f64
    let d = 111.55;// default f64
    assert_eq!(8, std::mem::size_of_val(&d)); // 8 bytes
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let y = 0.0f32; // литерал f32
    let x = 0.0; // тип выводится, f64 по умолчанию
    // точка обязательна
    let z: f32 = 0; // error: expected f32, found integer variable
    let z: f32 = 0.0;
    let not_a_number: f32 = std::f32::NAN;
    let inf: f32 = std::f32::INFINITY;
    // есть куча методов
    8.5f32.ceil().sin().round().sqrt()
}
</code></pre>
