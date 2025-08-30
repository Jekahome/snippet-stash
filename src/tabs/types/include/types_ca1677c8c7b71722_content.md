


<pre><code class="language-rust">
use std::mem;
enum MultiVariateEnum {
    A { name: String },
    B { name: String },
    C,
    D
}
fn swizzle(e: &mut MultiVariateEnum) {
    use MultiVariateEnum::*;
    *e = match e {
        // Правила владения не позволяют брать "name" по значению, но мы не можем 
        // берем значение из изменяемой ссылки, если мы не заменим его:
        A { name } => B { name: mem::take(name) },
        B { name } => A { name: mem::take(name) },
        C => D,
        D => C
    }
}
fn main() {
  let mut a = MultiVariateEnum::A{name:"agg".to_string()};
  swizzle(&mut a);
    if let MultiVariateEnum::B{name} = a {
        print!("{}",name);
    }
}
</code></pre>
