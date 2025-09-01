

<pre><code class="language-rust">
pub struct List<T> {
    head: Option<Box<Node<T>>>
}
struct Node<T> {
    elem: T,
    next:  Option<Box<Node<T>>>
}
impl<T> List<T> {
    pub fn new() -> Self {
        List { head: None }
    }

    pub fn push(&mut self, elem: T) {
        let new_node = Box::new(Node {
            elem: elem,
            next: self.head.take(),
        });

        self.head = Some(new_node);
    }
    pub fn iter_mut(&mut self) -> IterMut<'_, T> {
        IterMut { next: self.head.as_deref_mut() }
    }
}
pub struct IterMut<'a, T> {
    next: Option<&'a mut Node<T>>,
}

impl<'a, T> Iterator for IterMut<'a, T> {
    type Item = &'a mut T;

    fn next(&mut self) -> Option<Self::Item> {
// Метод Option::take подменяет значение в памяти как std::mem::replace 
// и находим новую ссылку для self.next 
        self.next.take().map(|node| {
            self.next = node.next.as_deref_mut();
            &mut node.elem
        })
    }
}

#[cfg(test)]
mod test {
    use super::{Node,List};
    #[test]
    fn iter_mut() {
        let mut list  = List::new();
        list.push(1); list.push(2); list.push(3);

        let mut iter = list.iter_mut();
        assert_eq!(iter.next(), Some(&mut 3));
        assert_eq!(iter.next(), Some(&mut 2));
        assert_eq!(iter.next(), Some(&mut 1));
        
        for i in list.iter_mut(){
            println!("{}",i);
        }
        for i in list.iter_mut(){
            println!("{}",i);
        }
    }
}
</code></pre>
