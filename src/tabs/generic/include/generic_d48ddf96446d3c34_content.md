

Мы ограничили входной параметр типажом `Display` и `Debug`, т.е. ф-ция принимает только те типы которые реализуют `Display и Debug`

Ограничение сужает список типов, допустимых к использованию
 
<pre><code class="language-rust">
fn printer<T: Debug + Display>(t: T) {
    println!("{:?} {}", &t,&t);
}
</code></pre>
