

**с/без turbofish:**
<pre><code class="language-rust">
fn main(){
 let v = "42".parse().unwrap(); // Компилятор сам решает, что `v: i32`
 let v = "42".parse::<i32>().unwrap(); // Явно указали тип `i32`
}
</code></pre>

**generic функция**
<pre><code class="language-rust">
fn max<T: PartialOrd>(a: T, b: T) -> T {
    if a > b { a } else { b }
}
fn main(){
 let n = max::<i32>(10, 20); // Явно указали тип `T = i32`
 // Без `::<i32>` компилятор смог бы догадаться, но если аргументы разные или контекст сложный — пригодится.
}
</code></pre>

**При работе с коллекциями**
<pre><code class="language-rust">
fn main(){
 let v = Vec::<i32>::new(); // Создаём пустой вектор i32
}
</code></pre>

**Пример с Option/Result**
<pre><code class="language-rust">
fn main(){
 let x = None; // ❌ Ошибка: компилятор не знает тип T
 let x = None::<u32>; // ✅ Теперь x: Option<u32>

 let x = Some(42); // Компилятор автоматически выведет Option<i32>
 let y = Some::<u8>(42); // ✅ Явно указали нужный тип u8

 let res = Ok::<i32, &str>(10);       // ✅ через turbofish
 let err = Err::<i32, &str>("Ошибка"); // ✅ Типы: Result<i32, &str>
}
</code></pre>
