


<pre><code class="language-rust">
#[derive(Debug)]
struct Data(Cell<i32>);
impl Data{
    fn change(&self,new:i32){
        self.0.set(new);
    }
}
#[derive(Debug)]
struct Wrap(Data);
impl Wrap{
    fn change(&self,new:i32){
        self.0.change(new);
    }
}
fn main() {
   let wrap = Wrap(Data(Cell::new(1)));
   let wrap_ref_1 = &wrap;
   let wrap_ref_2 = &wrap;
   wrap_ref_2.change(3);
   wrap_ref_1.change(4); // Кто последний изменил то такие данные и останутся
   assert_eq!(4,wrap.0.0.get());
}
</code></pre>
