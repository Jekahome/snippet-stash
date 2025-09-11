

```
pub struct List<T> {
    head: Option<Box<Node<T>>>
}
struct Node<T> {
    elem: T,
    next: Option<Box<Node<T>>>,
}
```


`list -> A -> B -> C`

Когда list начнет выполнять Drop, он попытается drop A, который попытается drop B, который попытается drop C.  
Это рекурсивный код, а рекурсивный код может взорвать стек!
Нам придется вручную написать итеративный сброс для List подъема узлов из их коробок.
```
impl Drop for List {
    fn drop(&mut self) {
        let mut cur_link = mem::replace(&mut self.head, Link::Empty);
        // `while let` == "do this thing until this pattern doesn't match"
        while let Link::More(mut boxed_node) = cur_link {
            cur_link = mem::replace(&mut boxed_node.next, Link::Empty);
            // boxed_node goes out of scope and gets dropped here;
            // but its Node's `next` field has been set to Link::Empty
            // so no unbounded recursion occurs.
        }
    }
}
```

или
```
impl<T> Drop for List<T> {
    fn drop(&mut self) {
        let mut cur_link = self.head.take();
        while let Some(mut boxed_node) = cur_link {
            cur_link = boxed_node.next.take();
        }
    }
}
```

Наша реализация drop на самом деле очень похожа на `while let Some(_) = self.pop() { }`, которая, безусловно, проще.
Pop возвращает `Option<i32>`, в то время как наша реализация манипулирует только `Links ( Box<Node>)`. Таким образом, наша реализация перемещает только указатели на узлы, в то время как реализация на основе всплывающих окон перемещает значения, которые мы храним в узлах. Это может быть очень дорого, если мы обобщим наш список и кто-то будет использовать его для хранения больших экземпляров 




