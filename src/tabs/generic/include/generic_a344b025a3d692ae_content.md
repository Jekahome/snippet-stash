

Обратной стороной мономорфизации является создание большего количества кода, поэтому, если вы используете универсальные функции с множеством разных типов, ваш двоичный файл может раздуться.

**монорепликация** (monomorphization): компилятор создаёт **отдельную версию функции `max` для каждого типа**, который мы используем.

<pre><code class="language-rust">
fn max<T: PartialOrd>(a: T, b: T) -> T { 
    if a > b { a } else { b } 
} 

let m1 = max(5, 10); // Работает с i32 
let m2 = max(3.14, 2.71); // Работает с f64
</code></pre>
Поэтому для `i32` и `f64` будут разные реализации. 

---
 
<details>
<summary>пример мономорфизации, параметрический полиморфизм (Generics)</summary>
<pre><code class="language-rust">
trait Value {
    fn as_int(&self) -> Option<isize> { None }
    fn as_text(&self) -> Option<&str> { None }
}
impl Value for isize {
    fn as_int(&self) -> Option<isize> { Some(*self) }
}
impl Value for String {
    fn as_text(&self) -> Option<&str> { Some(self) }
}
fn print_value<T: Value>(val: T) {
    if let Some(num) = val.as_int() {
        println!("A number w/ {} ones in binary", num.count_ones());
    }
    if let Some(string) = val.as_text() {
        println!("A string as bytes: {:?}", string.as_bytes());
    }
}
fn main() {
    print_value(110);
    print_value(String::from("hello"));
}
</code></pre>
</details>

---

<details>
<summary>пример мономорфизации, полиморфизм подтипов (Subtyping / Inheritance)</summary>
<pre><code class="language-rust">
// Этот код создаёт monomorphization, компилятор создаёт отдельную версию функции animal_sound для каждого типа, с которым мы используем функцию, что раздувает бинарный файл.
trait Animal {
    fn make_sound(&self);
}

struct Dog;
impl Animal for Dog {
    fn make_sound(&self) { println!("Woof!"); }
}

struct Cat;
impl Animal for Cat {
    fn make_sound(&self) { println!("Meow!"); }
}

fn animal_sound(animal: &impl Animal) {
    animal.make_sound();
}

let dog = Dog;
let cat = Cat;
animal_sound(&dog);  // Woof!
animal_sound(&cat);  // Meow!
</code></pre>
</details>

---

**Почему это увеличивает бинарник?**

* `fn max<T: PartialOrd>` не существует как одна универсальная функция в рантайме.
* Rust делает примерно так:
<pre><code class="language-rust">
  fn max_i32(a: i32, b: i32) -> i32 { if a > b { a } else { b } }
  fn max_f64(a: f64, b: f64) -> f64 { if a > b { a } else { b } }
</code></pre>
 
* При большом количестве типов → больше кода → **code bloat**.

---

**Почему Rust так делает, а не как Java или C#?**

* Rust не имеет виртуальных функций по умолчанию и избегает динамической диспетчеризации ради скорости.
* Такой подход даёт:

  * ✅ Inline и оптимизация → очень быстрый код.
  * ✅ Без лишних указателей и heap → безопасный и эффективный.
  * ❌ Больший бинарник при множестве типов.

 

**Есть ли способ уменьшить размер бинарника в Rust?**

Да, три основных приёма:

1. Использовать динамическую диспетчеризацию (trait objects)

   ```rust
   fn max_dyn(a: &dyn PartialOrd, b: &dyn PartialOrd) -> &dyn PartialOrd { ... }
   ```

   Но это:

   * Медленнее (vtable lookup).
   * Теряет generic-производительность.

2. LTO (Link-Time Optimization)
   Добавь:

   ```toml
   [profile.release]
   lto = true
   ```

   Компилятор выкинет неиспользуемый код и схлопнет дубли.

3. Generic where нужно, перегрузка где можно
   Иногда проще написать две функции:

<pre><code class="language-rust">
   fn max_i32(a: i32, b: i32) -> i32 { ... }
   fn max_f64(a: f64, b: f64) -> f64 { ... }
</code></pre>
 
   Это как раз аналог **Ad-hoc полиморфизма** в C++.


 


