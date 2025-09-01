


<pre><code class="language-rust">
fn main(){
    let res = (1..=4).map(|x| x + 1);
    for x in res {
         println!("{}", x);// 2 3 4 5
    }
}
</code></pre>

---

<pre><code class="language-rust">
enum Status {
   Value(String),
   Stop,
}
fn main(){
    let list_of_numbers = vec![1, 2, 3];
    let list_of_strings1: Vec<String> = list_of_numbers.iter().map(|i| i.to_string()).collect();
    let list_of_strings2: Vec<String> = list_of_numbers.iter().map(ToString::to_string).collect();
    let list_of_strings2: Vec<Status> = list_of_numbers.iter().map(ToString::to_string).map(Status::Value).collect();
}
</code></pre>

---

<pre><code class="language-rust">
fn f(item:&i32)->String{
     format!("{item}")
}
fn main() {
      let f2 = |item:&i32|->String{
          format!("{item}")
      };
      let list_of_numbers = vec![1, 2, 3];
      let list_of_strings: Vec<String> = list_of_numbers.iter().map(ToString::to_string).collect();
      let list_of_strings: Vec<String> = list_of_numbers.iter().map(f).collect();
      let list_of_strings: Vec<String> = list_of_numbers.iter().map(f2).collect();
}
</code></pre>

---

<pre><code class="language-rust">
enum Status {
   Value(u32),
   Stop,
}
fn main(){
    let list_of_statuses: Vec<Status> = (0u32..20).map(Status::Value).collect();
}
</code></pre>

---

<pre><code class="language-rust">
#![feature(iter_map_windows)] 
fn main(){
    let strings = "abcd".chars()
        .map_windows::<_,_,2>(|[x, y]| format!("{}+{}", x, y))
        .collect::<Vec<String>>();
    assert_eq!(strings, vec!["a+b", "b+c", "c+d"]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    for i in (1..10).filter(|&x| x % 2 == 0) {
         println!("{}", i);
    }
//Вы можете соединить все три понятия вместе: начать с итератора, адаптировать его несколько раз, а затем потребить результат
    (1..)
        .filter(|&x| x % 2 == 0)
        .filter(|&x| x % 3 == 0)
        .take(5)
        .collect::<Vec<i32>>();
}
</code></pre>

---

<pre><code class="language-rust">
// поиск значений 
pub fn search<'a>(query: &str, contents: &'a str) -> Vec<&'a str> {
    contents.lines().filter(|line| line.contains(query)).collect()
}
fn main(){
  let v:Vec<i32> = (0..10).filter(|x| x % 2 == 0).chain(15..20).collect(); // //[0, 2, 4, 6, 8, 15, 16, 17, 18, 19]
// Поскольку замыкание, переданное в filter (), принимает ссылку, и многие итераторы перебирают ссылки, это приводит к возможной запутанной ситуации, когда тип замыкания является двойной ссылкой:
  let mut iter = [0, 1, 2].into_iter().filter(|x| **x > 1);
// Обычно вместо этого используется деструктурирование аргумента, чтобы отбросить его:
  let mut iter = [0, 1, 2].into_iter().filter(|&x| *x > 1);
// Или оба
  let mut iter = [0, 1, 2].into_iter().filter(|&&x| x > 1); 
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut iter = ["1", "lol", "3", "NaN", "5"].iter().filter_map(|s| s.parse().ok());
    assert_eq!(iter.next(), Some(1));assert_eq!(iter.next(), Some(3));assert_eq!(iter.next(), Some(5));
        
// Вот такой же пример но с filter and map (удобнее использовать чем  filter и map)
     let mut iter = ["1", "lol", "3", "NaN", "5"].iter().map(|s| s.parse()).filter(|s| s.is_ok()).map(|s| s.unwrap()); 
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut iter = [1, 2, 3].iter().peekable();
// peek() lets us see into the future
    assert_eq!(iter.peek(), Some(&&1));
    assert_eq!(iter.next(), Some(&1));
}
</code></pre>
