

* [Методы std::borrow::Cow]()
* [Примеры использования std::borrow::Cow]()

---

**Cow** — очень удобное перечисление. Это означает «клонировать при записи» и позволяет вам вернуть, &str если вам не нужен String, и a String, если он вам нужен. То же самое можно делать и с массивами, с векторами и т. д.
<pre><code class="language-rust">
fn main(){
    let s:Cow<'static, str> = "...".into();
    let s:Cow<'static, str> = Cow::from("...");
    let s:Cow<'static, str> = String::from("...").into();
    let s:Cow<'static, str> = Cow::from(String::from("..."));
    let arr:Cow<'static, [u8]> =  [1u8;0][..].into();
    let arr:Cow<'static, [u8]> = vec![1u8;0].into();
    let arr:Cow<'static, [u8]> =  [1u8;0][..].into();
    let arr:Cow<'static, [u8]> = Cow::from(&[1u8;0][..]);
}
</code></pre>

**Применение**
- Текстовый редактор, вектор строк. 
   Обычно строки читают, обычно их много. 
   Изредка иногда некоторые меняют, тогда &str на месте под Cow апгрейдится в String

- Считали файл как str, побили его строки на &str, положили их в вектор. 
   Затем пользователь дописывает в строку посередине файла. Без аллокации его новое содержимое уже не поместится в исходный &str.
