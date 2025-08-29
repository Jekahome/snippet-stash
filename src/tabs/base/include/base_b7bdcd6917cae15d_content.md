

При работе с небезопасным кодом мы часто можем оказаться в ситуации, когда типы или время жизни логически связаны со структурой, но фактически не являются частью поля структуры.
<pre><code class="language-rust">
struct Iter<'a, T: 'a> {
    ptr: *const T,
    end: *const T,
}
</code></pre>


Однако, поскольку `'a` не используется в теле структуры, он неограничен . 
Из-за проблем, которые это исторически вызывало, неограниченное время жизни и типы запрещены в определениях структур. Поэтому мы должны как-то относиться к этим типам в теле.

Мы делаем это с помощью маркера особого типа PhantomData. 
PhantomData не занимает места, но моделирует поле заданного типа для статического анализа. 
<pre><code class="language-rust">
struct Iter<'a, T: 'a> {
    ptr: *const T,
    end: *const T,
    _marker: std::marker::PhantomData<&'a T>,
}
</code></pre>

---- 

Другой важный пример - Vec, который (приблизительно) определяется следующим образом:
Средство проверки освобождения Drop определит, что `Vec<T>` не владеет никакими значениями типа T
<pre><code class="language-rust">
struct Vec<T> {
    data: *const T, // *const for variance!
    len: usize,
    cap: usize,
}
</code></pre>

Чтобы сообщить Drop, что у нас есть собственные значения типа T и, следовательно, мы можем освободить некоторые T, когда сработает Drop::drop
Мы должны добавить дополнительные PhantomData:
<pre><code class="language-rust">
struct Vec<T> {
    data: *const T, // *const for variance!
    len: usize,
    cap: usize,
    _marker: std::marker::PhantomData<T>,
}
</code></pre>
 
