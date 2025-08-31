


<pre><code class="language-rust">
fn check(test: impl Test){
    test.foo();
    //test.hola();// method not found in `impl Test`
}
trait Test{
    fn foo(&self);
}
impl dyn Test + '_{
    fn hola(&self){
        println!("hola");
    }
    fn play(self: Box<&Self>){
        println!("play");
    }
}

#[derive(Debug)]
struct TestImpl{}

impl Test for TestImpl{
    fn foo(&self){
        println!("TestImpl");
    }
}
fn main(){
    let test:&dyn Test = &TestImpl{};
    test.hola();
    test.foo();

    let test:Box<&dyn Test> = Box::new(&TestImpl{});
    test.play();
}
</code></pre>
