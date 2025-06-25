Затенение переменной
<pre><code class="language-rust"> 
fn main() {
    let my_number = 8;
    println!("{}", my_number); // 8
    {
        let my_number = 9.2;
        println!("{}", my_number);  // 9.2
    }
    println!("{}", my_number); // 8
}
</code> </pre>

-------------------------------
Затирание переменной новой
<pre><code class="language-rust"> 
fn main() {
    let x: i32 = 8;
    println!("{}", x); // Выводит 8
    let x =  42;
    println!("{}", x); // Выводит 42
}
</code> </pre>
