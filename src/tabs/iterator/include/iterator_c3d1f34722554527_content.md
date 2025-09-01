


<pre><code class="language-rust">
struct Foo {
    count: u8
}
impl Iterator for Foo {                           
    type Item = u8;
    fn next(&mut self) -> Option<Self::Item> {
        match self.count {
            0 => {
                self.count = self.count + 1;
                Option::Some(1)                   
            }
            1 => {
                self.count = self.count + 1;
                Option::Some(5)                   
            }
            _ => None                             
        }
    }
}
fn main(){
    let i = Foo { count: 0 };
    let v = Vec::from_iter(i);                        
    for value in v {
        println!("value: {}", value);
    }
}
</code></pre>
