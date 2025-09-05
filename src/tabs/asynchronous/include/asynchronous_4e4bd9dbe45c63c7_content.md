

<pre><code class="language-rust">
use futures::future::{BoxFuture, FutureExt};
use std::time::Duration;
use tokio::time::sleep;

// Определение рекурсивного типа (дерево)
enum Tree {
    Leaf(i32),
    Node(i32, Box<Tree>, Box<Tree>),
}
// Функция, которая возвращает BoxFuture с рекурсивным типом Tree
fn create_tree(condition: bool) -> BoxFuture<'static, Tree> {
    if condition {
        // Возвращаем асинхронную задачу, которая создает дерево с одной вершиной (Node)
        async move {
            sleep(Duration::from_secs(1)).await;
            Tree::Node(10, Box::new(Tree::Leaf(5)), Box::new(Tree::Leaf(15)))
        }
        .boxed()
    } else {
        // Возвращаем асинхронную задачу, которая создает простое дерево с одним узлом (Leaf)
        async move {
            sleep(Duration::from_secs(1)).await;
            Tree::Leaf(20)
        }
        .boxed()
    }
}
#[tokio::main]
pub async fn run() {
    let tree_future = create_tree(true);
    let tree = tree_future.await;
    match tree {
        Tree::Node(value, left, right) => {
            println!("Node value: {}", value);
            if let Tree::Leaf(left_value) = *left {
                println!("Left child value: {}", left_value);
            }
            if let Tree::Leaf(right_value) = *right {
                println!("Right child value: {}", right_value);
            }
        }
        Tree::Leaf(value) => {
            println!("Leaf value: {}", value);
        }
    }
}
</code></pre>

---

Пример для типа без размера
<pre><code class="language-rust">
use futures::future::{BoxFuture, FutureExt};
use std::time::Duration;
use tokio::time::sleep;

// Структура Cacher с полем, содержащим замыкание, обернутое в Box
struct Cacher<N, M> {
    calculation: Box<dyn Fn(N) -> M>,
}
// Имплементация функции, которая создает асинхронную задачу, использующую Cacher
impl<N, M> Cacher<N, M>
where
    M: 'static + std::marker::Send, // Чтобы результат был совместим с BoxFuture, нужен 'static
{
    fn new<F>(calculation: F) -> Self
    where
        F: Fn(N) -> M + 'static,
    {
        Cacher {
            calculation: Box::new(calculation),
        }
    }
    fn run(&self, input: N) -> BoxFuture<'static, M> {
        let result = (self.calculation)(input); // Выполнение замыкания
        async move { result }.boxed()
    }
}
#[tokio::main]
pub async fn run() {
    // Создаем новый Cacher с функцией, которая возвращает квадрат числа
    let cacher = Cacher::new(|x: i32| x * x);
    // Запускаем асинхронную задачу, которая выполняет функцию и возвращает результат
    let future = cacher.run(5);
    let result = future.await;
    println!("Result: {}", result); // Печатает "Result: 25"
}
</code></pre>
