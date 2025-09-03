

Практические примеры:
* Разделяемого изменяемого состояния
* Связанных структур данных (графы, деревья)
* Тестирования и мокапов
* Шаблона "Наблюдатель" (Observer pattern)

---

**Пример разделяемого изменяемого состояния**

<pre><code class="language-rust">
use std::rc::Rc;
use std::cell::RefCell;

struct AppState {
    counter: i32,
    is_running: bool,
}
impl AppState {
    fn increment(&mut self) {
        self.counter += 1;
    }
}

struct Component {
    state: Rc<RefCell<AppState>>,
}
impl Component {
    fn update(&self) {
        let mut state = self.state.borrow_mut();
        state.increment();
        println!("Counter: {}", state.counter);
    }
}
fn main() {
    let state = Rc::new(RefCell::new(AppState {
        counter: 0,
        is_running: true,
    }));
    
    let comp1 = Component { state: Rc::clone(&state) };
    let comp2 = Component { state: Rc::clone(&state) };
    
    comp1.update(); // Counter: 1
    comp2.update(); // Counter: 2
    comp1.update(); // Counter: 3
}
</code></pre>

---


**Пример тестирования и мокапов**

<pre><code class="language-rust">
use std::rc::Rc;
use std::cell::RefCell;

trait Logger {
    fn log(&self, message: &str);
}

struct MockLogger {
    messages: Rc<RefCell<Vec<String>>>,
}

impl MockLogger {
    fn new() -> Self {
        Self {
            messages: Rc::new(RefCell::new(Vec::new())),
        }
    }
    
    fn get_messages(&self) -> Rc<RefCell<Vec<String>>> {
        Rc::clone(&self.messages)
    }
}

impl Logger for MockLogger {
    fn log(&self, message: &str) {
        self.messages.borrow_mut().push(message.to_string());
    }
}

fn main() {
    let logger = MockLogger::new();
    let messages = logger.get_messages();
    
    logger.log("Hello");
    logger.log("World");
    
    println!("Messages: {:?}", messages.borrow());
    // ["Hello", "World"]
}
</code></pre>

--

**Но требует осторожности из-за**:
* Возможности циклических ссылок
<pre><code class="language-rust">
fn main(){
    // ОПАСНО: может привести к утечкам памяти!
    let a = Node::new(1);
    let b = Node::new(2);

    a.borrow_mut().add_neighbor(Rc::clone(&b));
    b.borrow_mut().add_neighbor(Rc::clone(&a)); // Цикл!
}
</code></pre>

* Проверок во время выполнения (паники)
<pre><code class="language-rust">
fn main(){
    let data = Rc::new(RefCell::new(42));

    let borrow1 = data.borrow(); // Нормально
    // let borrow2 = data.borrow_mut(); // ПАНИКА! Уже есть неизменяемая ссылка
}
</code></pre>

* Немного больших накладных расходов

 








