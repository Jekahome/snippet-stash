


<pre><code class="language-rust">
fn copy_if<'a, F>(slice: &[i32], pred: F) -> Vec<i32> 
 where  F: Fn(&'a i32) -> bool {
      let mut result = vec![];
       for &element in slice {
          if pred(&element) {
            result.push(element);
          }
       }
    result
}
</code></pre>


Компилятор дает следующую ошибку:

> error: `element` does not live long enough
>
> if pred(&element) {  
>         ^~~~~~~

потому что локальная переменная element не живет так долго, как lifetime `'a`» (как мы видим из комментариев кода).

Время жизни не может быть объявлено на уровне функции, потому что нам нужно другое время жизни. 
Вот почему нам нужен for<'a> : чтобы указать, что ссылка может быть действительной для любого времени жизни (следовательно, можно использовать меньшее время жизни).
<pre><code class="language-rust">
fn copy_if<F>(slice: &[i32], pred: F) -> Vec<i32> 
 where for<'a> F: Fn(&'a i32) -> bool {
    let mut result = vec![];
    for &element in slice {
        if pred(&element) {
            result.push(element);
        }
    }
    result
}
fn main(){}
</code></pre>
