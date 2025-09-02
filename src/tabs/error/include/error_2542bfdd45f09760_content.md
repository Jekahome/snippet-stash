

<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(2);
    assert_eq!(x.unwrap(), 2);
    let x: Result<u32, &str> = Err("emergency failure");
    x.unwrap(); // panics with emergency failure
}
</code></pre>

---


**unwrap_or** (по умолчанию: T): эта функция разворачивает `Option<T>`, возвращая внутреннее значение, если оно существует, или предоставленное значение по умолчанию, если параметр равен None. Это просто и эффективно, когда достаточно простого значения по умолчанию. Однако будьте осторожны! Если значение по умолчанию дорого для вычисления или зависит от побочного эффекта, оно всегда будет выполняться, даже если параметр присутствует.

**unwrap_or_else**`(default_fn: FnOnce() -> T)`:  Вместо того, чтобы напрямую указывать значение по умолчанию, мы передаем замыкание или функцию в unwrap_or_else. Эта функция вызывается, только если для параметра установлено значение None, что позволяет избежать ненужных вычислений, когда значение существует. Это позволяет нам откладывать дорогостоящие операции или операции с побочным эффектом до тех пор, пока они не понадобятся, оптимизируя производительность.

Помните, что разница заключается во времени выполнения и эффективности при работе с побочными эффектами. Используйте unwrap_or, когда резервное значение простое и не имеет побочных эффектов. С другой стороны, выбирайте unwrap_or_else, когда вам нужен контроль над логикой отката, особенно когда это связано с дорогостоящими вычислениями или побочными эффектами.

<pre><code class="language-rust">
fn main(){
    let optb = 2;
    let x: Result<u32, &str> = Ok(9);
    assert_eq!(x.unwrap_or(optb), 9);

    let x: Result<u32, &str> = Err("error");
    assert_eq!(x.unwrap_or(optb), optb);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    fn count(x: &str) -> usize { x.len() }

    assert_eq!(Ok(2).unwrap_or_else(count), 2);
    assert_eq!(Err("foo").unwrap_or_else(count), 3);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Err("emergency failure");
    x.expect("Testing expect"); // panics
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(2);
    x.unwrap_err(); // panics with `2`Run
    let x: Result<u32, &str> = Err("emergency failure");
    assert_eq!(x.unwrap_err(), "emergency failur
}
</code></pre>

---

Паники, если значение равно «ОК», с сообщением о панике, включая переданное сообщение, и содержимым «Ок» 
<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(10);
    x.expect_err("Testing expect_err"); // panics with `Testing expect_err: 10`
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let good_year_from_input = "1909";
    let bad_year_from_input = "190blarg";
    let good_year = good_year_from_input.parse().unwrap_or_default();
    let bad_year = bad_year_from_input.parse().unwrap_or_default();

    assert_eq!(1909, good_year);
    assert_eq!(0, bad_year);
}
</code></pre>
