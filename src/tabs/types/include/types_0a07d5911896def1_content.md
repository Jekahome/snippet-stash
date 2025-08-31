


<pre><code class="language-rust">
struct A;

impl A{
    fn foo(&self, arg1:i32){
        print!("arg1");
    }
}

fn main() {
    let a = A;
    a.foo(1);        // сокращенный синтаксис вызова метода
    A::foo(&a,1); // полный синтаксис вызова метода
}
</code></pre>
