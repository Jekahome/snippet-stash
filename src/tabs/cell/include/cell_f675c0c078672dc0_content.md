

**Плохой вариант реализации списка**

Пользователь нашего API знает детали реализации! Что это дает? Где элегантная абстракция ?

Граф можно представить несколькими способами. Чтобы проиллюстрировать, как на практике работает внутренняя изменяемость (interior mutability), выберем самое простое представление: список узлов.

Каждый узел имеет внутреннее значение и список смежных узлов, с которыми он соединён (через направленное ребро).

Этот список смежных узлов не может быть единственным владельцем этих узлов, иначе каждый узел имел бы не более одного ребра к другому узлу, и граф не смог бы владеть этими узлами.

Нам нужно обернуть Node в контейнер с подсчётом ссылок, такой как Rc или Arc. Если реализовывать только через Rc то вы можете вызвать, get_mut чтобы получить `Option<&mut T>`, **но это сработает только один раз**: get_mut возвращает только изменяемую ссылку, как если бы есть только одна «сильная» ссылка на значение

Мы выберем Rc, так как это учебный пример. Однако `Rc<T>` и `Arc<T>` обеспечивают безопасность памяти, выдавая только разделяемые (т.е. неизменяемые) ссылки на оборачиваемый объект, а нам нужна изменяемость, чтобы соединять узлы друг с другом.

Решение этой проблемы — обернуть Node в Cell или RefCell, чтобы восстановить изменяемость. Мы используем **RefCell**, потому что `Node<T>` не реализует Copy (мы не хотим иметь независимые копии узлов!).

<pre><code class="language-rust">
use std::cell::RefCell;
use std::rc::Rc;
// Представляет ссылку на узел.
// Это делает код менее повторяющимся и более читаемым.
type NodeRef<T> = Rc<RefCell<Node<T>>>;

struct Node<T> {
    inner_value: T,
    adjacent: Vec<NodeRef<T>>,
}
impl<T> Node<T> {
    // Создает новый узел без ребер.
    fn new(inner: T) -> Node<T> {
        Node { inner_value: inner, adjacent: vec![] }
    }
    // Добавляет направленное ребро от этого узла к другому узлу.
    fn add_adjacent(&mut self, other: NodeRef<T>) {
        self.adjacent.push(other);
    }
}
struct Graph<T> {
    nodes: Vec<NodeRef<T>>,
}
fn main() {
    let node_1: NodeRef<u32> = Rc::new(RefCell::new(Node::new(1)));
    let node_2: NodeRef<u32> = Rc::new(RefCell::new(Node::new(2)));
    let node_3: NodeRef<u32> = Rc::new(RefCell::new(Node::new(3)));
    // Соединить некоторые узлы (с направленными ребрами/directed edges)
    (node_1.borrow_mut()).add_adjacent(node_2.clone());
    (node_1.borrow_mut()).add_adjacent(node_3.clone());
    (node_2.borrow_mut()).add_adjacent(node_1.clone());
    (node_3.borrow_mut()).add_adjacent(node_1.clone());
    // Добавим узлы в граф 
    let mut graph = Graph { nodes: vec![] };
    graph.nodes.push(node_1);
    graph.nodes.push(node_2);
    graph.nodes.push(node_3);
    // Покажите каждый узел в графе и перечислите его соседей.
    for node in graph.nodes.iter().map(|n| n.borrow()) {
        let value = node.inner_value;
        let neighbours = node.adjacent.iter()
            .map(|n| n.borrow().inner_value)
            .collect::<Vec<_>>();
        println!("node ({}) is connected to: {:?}", value, neighbours);
    }
}
</code></pre>

---

<pre><code class="language-rust">
use std::cell::RefCell;
use std::rc::Rc;
// Представляет ссылку на узел.
// Это делает код менее повторяющимся и более читаемым.
type NodeRef<T> = Rc<RefCell<_Node<T>>>;

// Частное представление узла.
struct _Node<T> {
    inner_value: T,
    adjacent: Vec<NodeRef<T>>,
}
// Публичное представление узла с некоторым синтаксическим сахаром.
struct Node<T>(NodeRef<T>);

impl<T> Node<T> {
    // Создает новый узел без ребер.
    fn new(inner: T) -> Node<T> {
        let node = _Node { inner_value: inner, adjacent: vec![] };
        Node(Rc::new(RefCell::new(node)))
    }
    // Добавляет направленное ребро от этого узла к другому узлу.
    fn add_adjacent(&self, other: &Node<T>) {
        (self.0.borrow_mut()).adjacent.push(other.0.clone());
    }
}
struct Graph<T> {
    nodes: Vec<Node<T>>,
}
impl<T> Graph<T> {
    fn with_nodes(nodes: Vec<Node<T>>) -> Self {
        Graph { nodes: nodes }
    }
}

// Реализовать изменения:
// 1. Замена RefCell на Cell
// 2. Удаление RefCell и использование Rc<Node<T>>
// 3. Удаление Rc и использование RefCell<Node<T>>
fn main() {
    let node_1 = Node::new(1);
    let node_2 = Node::new(2);
    let node_3 = Node::new(3);

    // Соединить некоторые узлы (с направленными ребрами/directed edges)
    node_1.add_adjacent(&node_2);
    node_1.add_adjacent(&node_3);
    node_2.add_adjacent(&node_1);
    node_3.add_adjacent(&node_1);

    // Добавим узлы в граф
    let graph = Graph::with_nodes(vec![node_1, node_2, node_3]);

    // Покажите каждый узел в графе и перечислите его соседей.
    for node in graph.nodes.iter().map(|n| n.0.borrow()) {
        let value = node.inner_value;
        let neighbours = node.adjacent.iter()
            .map(|n| n.borrow().inner_value)
            .collect::<Vec<_>>();
        println!("node ({}) is connected to: {:?}", value, neighbours);
    }
}
</code></pre>
