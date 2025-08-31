

Неудобный синтаксис при передаче Graph в ф-цию как параметра
<pre><code class="language-rust">
trait Graph<N, E> {
    fn has_edge(&self, &N, &N) -> bool;
    fn edges(&self, &N) -> Vec<E>;
}
fn distance<N, E, G: Graph<N, E>>(graph: &G, start: &N, end: &N) -> u32 {...}
</code></pre>

**Решение**

Чтобы сформировать какого-либо вида Graph, нужны соответствующие типы `E` и `N`, собранные вместе с помощью ассоциированных типов
<pre><code class="language-rust">
trait Graph {
    type N;
    type E;

    fn has_edge(&self, &Self::N, &Self::N) -> bool;
    fn edges(&self, &Self::N) -> Vec<Self::E>;
}
fn distance<G: Graph>(graph: &G, start: &G::N, end: &G::N) -> u32 {...} // Больше нет необходимости иметь дело с типом E

// Реализация ассоциированных типов
struct Node;
struct Edge;
struct MyGraph;
impl Graph for MyGraph {
    type N = Node;
    type E = Edge;
    fn has_edge(&self, n1: &Node, n2: &Node) -> bool {
        true
    }
    fn edges(&self, n: &Node) -> Vec<Edge> {
        Vec::new()
    }
}

// Типаж-объект с явным указанием ассоциативного типа
fn main(){
    let graph = MyGraph;
    let obj = Box::new(graph) as Box<Graph<N=Node,E=Edge>>
}
</code></pre>

