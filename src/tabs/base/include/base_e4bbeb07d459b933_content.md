

Реализация позволяет избежать клонирования вектора, и, на мой взгляд, скрытие любых промежуточных шагов приводит к более приятному API
<pre><code class="language-rust">
/// Наша простая сортированная векторная структура - это просто оболочка вокруг Vec
struct SortedVec<T>(Vec<T>);

/// Ожидается преобразование фрагментов в SortedVec.
impl<'a, T: Ord + Clone> From<&'a [T]> for SortedVec<T> {
    fn from(slice: &[T]) -> Self {
        let mut vec = slice.to_owned();
        vec.sort();
        SortedVec(vec)
    }
}

/// Также ожидается преобразование Vec.
/// Мы можем отсортировать вектор на месте, а затем поместить его в SortedVec.
impl<T: Ord + Clone> From<Vec<T>> for SortedVec<T> {
    fn from(mut vec: Vec<T>) -> Self {
        vec.sort();
        SortedVec(vec)
    }
}

/// Преобразование LinkedList также имеет смысл, но в нем нет 
/// представление среза, поэтому нам придется полагаться на его итератор.
impl<T: Ord + Clone> From<LinkedList<T>> for SortedVec<T> {
    fn from(list: LinkedList<T>) -> Self {
        let mut vec: Vec<T> = list.iter().cloned().collect();
        vec.sort();
        SortedVec(vec)
    }
}
fn main(){
   let vec = vec![1u8, 2, 3];
   // Преобразовать в срез
   let sorted = SortedVec::from(&vec[1..]);
   // ... a vector
   let sorted = SortedVec::from(vec);
   // ... a linked list
   let mut linked_list: LinkedList<u8> = LinkedList::new();
   linked_list.extend(&[1, 2, 3]);
   let sorted = SortedVec::from(linked_list);
}
</code></pre>
