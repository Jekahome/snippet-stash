

Расходящиеся функции. Ф-ции которые не возвращают управление наз. diverges
<pre><code class="language-rust">
fn main(){
 fn foo() {
   let x:! = return;
 }
}
</code></pre>


Значение расходящейся функции может быть использовано как значение любого типа:
<pre><code class="language-rust">
fn main(){
 let x: i32 = diverges();
 let x: String = diverges();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
 fn test(){
    struct Point;
    enum Void {}
    fn foo(void: Void) -> Vec<Point> {
        match void {
            _ => vec![]
        }
    }
 }
}
</code></pre>

---

<pre><code class="language-rust">
fn server_loop() -> Result<!, ConnectionError> {
    loop {
        let (client, request) = get_request()?;
        let response = request.process();
        response.send(client);
    }
}
</code></pre>
