


<pre><code class="language-rust">
trait Tagged {
    const TAG: &'static str;
}

struct Foo;
impl Tagged for Foo { const TAG: &'static str = "Foo"; }

struct Bar;
impl Tagged for Bar { const TAG: &'static str = "Bar"; }

fn by_tag(tag: &str) {
    match tag {
        Foo::TAG => println!("foo"),
        Bar::TAG => println!("bar"),
        _ => panic!("unknown tag: {:?}", tag)
    }
}
fn main(){
    by_tag("Foo");// foo
    print!("{}", Bar::TAG);
}
</code></pre>

---

<pre><code class="language-rust">
struct Foo<const N: usize>([i32; N]);
impl<const N: usize> Foo<N> {
    const CONST: usize = N * 4;
    // .... fn
}
 
fn main() {
    let foo = Foo([1,2]);
    assert_eq!(8,Foo::<2>::CONST);
    print!("{:?}", Foo::<2>::CONST);
}
</code></pre>
