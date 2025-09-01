


<pre><code class="language-rust">
fn main(){
    let mut vec = vec![1, 2, 3, 4, 5];
    vec.truncate(2);
    assert_eq!(vec, [1, 2]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec!["hello"];
    vec.resize(3, "world");
    assert_eq!(vec, ["hello", "world", "world"]);

    let mut vec = vec![1, 2, 3, 4];
    vec.resize(2, 0);
    assert_eq!(vec, [1, 2]);
}
</code></pre>

---

Изменяет размеры на Vec месте, так что len равно new_len.

Если new_len больше чем len, то Vec увеличивается на разницу, каждый дополнительный слот заполняется результатом вызова закрытия f
Если new_len меньше чем len, Vec просто усекается.
<pre><code class="language-rust">
fn main(){
    let mut vec = vec![1, 2, 3];
    vec.resize_with(5, Default::default);
    assert_eq!(vec, [1, 2, 3, 0, 0]);

    let mut vec = vec![];
    let mut p = 1;
    vec.resize_with(4, || { p *= 2; p });
    assert_eq!(vec, [2, 4, 8, 16]);
}
</code></pre>
