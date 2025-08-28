

 Rust не позволяет вам вручную вызвать метод Drop признака drop; вместо этого вы должны вызвать std::mem::drop функцию, предоставляемую стандартной библиотекой, если вы хотите принудительно сбросить значение до конца своей области видимости.
Вызов std::mem::drop для явного удаления значения до его выхода из области видимости 
<pre><code class="language-rust">
fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created.");
    std::mem::drop(c);
    println!("CustomSmartPointer dropped before the end of main.");
}
</code></pre>
