

Как правило, вам не следует указывать `Rc<RefCell<T>> (или Arc<Mutex<T>>)` в API, а лучше сделать их внутренней деталью реализации. Поступая таким образом, вы получаете полный контроль над всеми блокирующими областями внутри ваших методов (ни одна область не может расширяться за пределы), поэтому убедитесь, что пересечения не произойдет, и предоставьте полностью безопасный API.
<pre><code class="language-rust">
fn main(){
    let owner1 = Arc::new(Mutex::new("string"));
    let owner2 = owner1.clone();
    {
        let value = owner1.lock.unwrap();
        // Никакого пересечения, поскольку область блокировки owner1 на этом заканчивается.
       // Но это должно быть внутри вашего API, а не то как его должны использовать клиенты
    }
    {
        let value = owner2.lock.unwrap();
    }
}
</code></pre>

Спрятать внутрь реализации
<pre><code class="language-rust">
#[derive(Clone)]
struct SharedString(Arc<Mutex<String>>);

impl SharedString {
    fn mutate_somehow(&self) {
        let mut val = self.lock.unwrap();
        *val = "another string"
    }
}
fn main(){
    let owner1 = SharedString(Arc::new(Mutex::new("string")));
    let owner2 = owner1.clone();

    // Здесь мы изменяем одно и то же значение, 
    // но пересечение областей блокировки не может произойти по замыслу. 
    // Такой API никогда не будет блокироваться или паниковать 
    // из-за нарушения правил заимствования во время выполнения.

    owner1.mutate_somehow();
    owner2.mutate_somehow();
}
</code></pre>




