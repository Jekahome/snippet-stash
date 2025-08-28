


<pre><code class="language-rust">
fn main(){
 #[derive(Default)]
 struct SomeOptions {
    foo: i32,
    bar: f32,
 }
 let options: SomeOptions = Default::default();

 // Если вы хотите переопределить конкретный параметр, но сохраните остальные значения по умолчанию:
 let  options  =  SomeOptions { foo : 42 , ..Default::default()};

 let i: i8 = Default::default();
 let (x, y): (Option<String>, f64) = Default::default();
 let (a, b, (c, d)): (i32, u32, (bool, bool)) = Default::default();
 println!("i:{},x:{:?},y:{},a:{},b:{},c:{},d:{}",i,x,y,a,b,c,d);// i:0,x:None,y:0,a:0,b:0,c:false,d:false
}
</code></pre>
