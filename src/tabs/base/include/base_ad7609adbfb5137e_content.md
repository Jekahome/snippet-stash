


<pre><code class="language-rust">
struct MyClosure<F> {
    data: (u8, u16),
    func: F,
}
impl<F> MyClosure<F> where F: Fn(&(u8, u16)) -> &u8 {
    fn call(&self) -> &u8 {
        (self.func)(&self.data)
    }
}

fn do_it(data: &(u8, u16)) -> &u8 { &data.0 }

fn main() {
    let my_c = MyClosure { data: (0, 1), func: do_it };
    assert_eq!(&0,my_c.call());
    // или
    let f:fn(&(u8, u16)) -> &u8 = do_it;
    let f:fn(&(u8, u16)) -> &u8 = |data:&(u8, u16)| -> &u8 { &data.0 };
    let my_c = MyClosure { data: (0, 1), func: f };
    assert_eq!(&0,my_c.call());   
}
</code></pre>
