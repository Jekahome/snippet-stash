

**Зачем нужны Ассоциированные типы**:
 - улучшает общую читаемость кода
 - переносит контроль над внутренним типов в реализацию (в отличии от generic, где контроль типа на стороне вызывающего код)
 
**Пример:**

Допустим, у нас есть коллекция, и мы хотим получить от неё итератор. 
Значения какого типа должен возвращать итератор? 
В точности того, который содержится в этой коллекции! 
Не вызывающая сторона должна решать, что вернёт итератор, а сам итератор лучше знает, что именно он умеет возвращать.

**Вариант с generic.**

тип `T` нужно снова и снова указывать в каждом месте, где упоминается итератор, а во-вторых, теперь стало возможно реализовать этот трейт несколько раз с разными типами.

Мы не можем просто взять и вызвать `iter.next()`, нужно обязательно дать компилятору знать, явно или неявно, какой тип будет возвращаться.

А всё потому, что мы смогли имплементировать трейт `Iterator` дважды с разным параметром для одного и того же `MyIterator`
<pre><code class="language-rust">

trait Iterator<T> {
    fn next(&mut self) -> Option<T>;
}
struct MyIterator;
impl Iterator<i32> for MyIterator {
    fn next(&mut self) -> Option<i32> {Some(0)}
}
impl Iterator<String> for MyIterator {
    fn next(&mut self) -> Option<String> {Some(0)}
}
fn foo<I, V>(container: &I) -> i32 where I: Iterator<V> { 0} //❌  приходится прокидывать V тип и выразить возвращаемое значение i32 не получилось через Iterator
fn main() {
    let mut iter = MyIterator;
    let lolwhat: Option<_> = iter.next();// ❌ Error! Какую реализацию выбрать i32 или String (в случае с Associated types мы не можем создать несколько вариантов `impl Iterator...`)
    let lolwhat: Option<i32> = iter.next();//  контроль типа на стороне вызывающего код, что нам не желательно в данном случае
}

</code></pre>

---

**Вариант с Associated types.**

Заметьте, что у итератора нет параметра типа, который позволил бы вызывающей стороне выбрать, что должен вернуть итератор.

Значения определяется самим итератором с помощью ассоциированного типа
<pre><code class="language-rust">

trait Iterator {
    type Item;
    fn next(&mut self) -> Option<Self::Item>;
}
struct MyIterator;
impl Iterator for MyIterator {
    type Item = i32;
    fn next(&mut self) -> Option<Self::Item> { None }
}
fn foo<C: Iterator>(container: &C) -> <MyIterator as Iterator>::Item { 0 } // ✅  коротко и возвращаемое значение выразить через Iterator
fn main() { 
    let mut iter = MyIterator;
    let lolwhat: Option<_> = iter.next(); //  ✅ 
}
</code></pre>
