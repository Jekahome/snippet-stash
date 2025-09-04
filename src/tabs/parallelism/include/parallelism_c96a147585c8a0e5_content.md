


<pre><code class="language-rust">
struct Actor1 {
    actor2_addr: Addr<Actor2>,
}
struct Actor2 {
    actor1_addr: Addr<Actor1>,
}
fn main(){
    let ctx1 = Context::<Actor1>::new();
    let ctx2 = Context::<Actor2>::new();

    let actor1 = Actor1 { actor2_addr: ctx2.address() };
    let actor2 = Actor2 { actor1_addr: ctx1.address() };
    ctx1.run(actor1);
    ctx2.run(actor2);
}
</code></pre>
