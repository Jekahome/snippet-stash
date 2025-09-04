


<pre><code class="language-rust">
#[derive(Default)]
struct Test{
    data:i32
}

или реализовать трейт Default

#[derive(PartialEq,Debug)]
struct Test{
    data:i32
}
impl std::default::Default for Test{
    fn default() -> Self{
          Self{data:0_i32}
    }
}
      
fn main() {
    let mut t:Test;
    t = Test::default();
    let t_2 = Test::default();

    let t:Test =  std::default::Default::default();
    assert_eq!( 0_i32, t.data );

    // ваш тип может использоваться там, где требуется Default реализация, 
    // любой из *or_default функций стандартной библиотеки 

    // Option::unwrap_or_default()
    let wrap:Option<Test> = None;
    let t: Test = wrap.unwrap_or_default();
    assert_eq!( 0_i32, t.data );

    // Result::unwrap_or_default()
    let wrap:Result<Test,()> = Err(());
    let t: Test = wrap.unwrap_or_default();
    assert_eq!( 0_i32, t.data );

    // HashMap::or_default()
    use std::collections::HashMap;
    let mut map: HashMap<&str, Test> = HashMap::new();
    let t:&mut Test = map.entry("poneyland").or_default();// entry - Получить состояние записи
    assert_eq!( *t, Test::default());
}
</code></pre>
