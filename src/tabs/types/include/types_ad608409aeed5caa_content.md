


<pre><code class="language-rust">
type Callback = Box<dyn Fn(u32) -> u32>;

fn adder(x: u32) -> Callback {
  Box::new(move |y| x + y)
}

fn multiplier(x: u32) -> Callback {
  Box::new(move |y| x * y)
}

fn main(){
    let i = 4;
    let f = adder(i);
    let result = f(4);
    assert_eq!(8,result);
}
</code></pre>
