


<pre><code class="language-rust">
struct Word {
    data:Cow<'static,str>
}
impl Word {
   fn new(s:&'static str)->Self {
        Self{data:Cow::Borrowed(s)} // или Self{data:s.into()}
    }
    fn more_than_three(&mut self){
        if self.data.len() < 4 { 
            self.data.to_mut().push_str("!!!"); // тут происходит alloc и можем push_str из-за Cow impl Deref
        }
    }
}
fn main() {
    let mut words:Vec<Word> = vec![];
    let mut iter = "one two three".split_whitespace();
    while let  Some(s) = iter.next(){
        words.push(Word::new(s));
    } 

    for w in words.iter_mut(){
        w.more_than_three(); // изменение некоторых данных
    }
    assert_eq!(words[0].data,"one!!!");
    assert_eq!(words[1].data,"two!!!");
    assert_eq!(words[2].data,"three");
}
</code></pre>
