


<pre><code class="language-rust">
fn foo<I: IntoIterator<Item = i64>>(iter: I) { /* ... */ }

// заменяет все:

fn foo(c: &[i64]) { /* ... */ }
fn foo(c: &Vec<i64>) { /* ... */ }
fn foo(c: &SomeOtherCollection<i64>) { /* ... */ }
</code></pre>

---

<pre><code class="language-rust">
fn get_nums(a: u32, b: u32) -> impl Iterator<Item = u32> {
    (a..b).filter(|x| x % 100 == 0)
}

fn main() {
    for n in get_nums(100, 1001) {
        println!("{}", n);
    }
}
</code></pre>
