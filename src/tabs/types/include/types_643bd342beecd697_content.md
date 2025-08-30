

Нет затрат на хранение лишних объектов, кортеж из одного элемента представлен в адресе как сам элемент
<pre><code class="language-rust">
// main.rs
fn main() {
  let t = (92,);
  // достаем адрес в памяти
  println!("{:?}", &t as *const (i32,)); // 0x7ffc6b2f6aa4
  println!("{:?}", &t.0 as *const i32); // 0x7ffc6b2f6aa4
}
</code></pre>

А например в python  не так
 
<pre><code class="language-python">
# main.py  
t = (92,)
print(id(t), end="<br>")     # 12818144
print(id(t[0])) # 2879856
</code></pre>
