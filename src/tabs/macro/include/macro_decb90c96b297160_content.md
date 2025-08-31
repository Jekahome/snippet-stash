


<pre><code class="language-rust">
macro_rules! foo4 {
 ($w:ident) => {//вызов с идентификатом
      let $w = 3;
      $w
 };

  // one=> просто для разделения вызова на разные реализация использования выражения
 (one=>$w:expr) => {//вызов выражением
      $w+10
 };
 (two=>$w:expr) => {//вызов выражением
      $w(1)
 };

($w:path) => {//вызов квалифицированным именем A::method
      $w(1)
 };

 ($w:ty,$val:ident,$data:expr) => {// $ty вызов типом
   {
      let $val:$w = $data(44);
      $val
   }
 };

 (pat => $w:pat) => {// вызов образцом
   println!(" pat " );
  };

  ($w:stmt) => {// вызов единственным оператором
   println!(" stmt " );

  };

  ($w:block)=>{// https://doc.rust-lang.org/stable/reference/expressions/block-expr.html
  //вызов последовательностью операторов, ограниченных фигурными скобками
    println!(" block " );
  };

  ($w:item) => {//  элемент. Например: fn foo() { }; struct Bar; // https://doc.rust-lang.org/stable/reference/items.html
   println!(" item " );
  };

// meta: «мета-элемент», как в атрибутах. Например: cfg(target_os = "windows").
($w:meta) => {
   println!(" meta " );
  };

 ($w:tt) => {//tt: единственное дерево лексем, подходит просто значение 7
   println!(" tt " );
  };
}

struct A;
impl A{
   pub fn method(p:i32)->i32{p}
}
trait T{}
 
fn main(){
    foo4!(x);//идентификатор ident
    assert_eq!(3,x);

    assert_eq!(12,foo4!(one=> 1+1));//выражение expr

    let b:bool = true;
    assert_eq!(11,foo4!(one=> if b { 1 } else { 2 }));//выражение expr

    assert_eq!(21,foo4!(two=> |x|->i32 {x+20} ) );//выражение expr

    fn test_foo4(p:i32)->i32{
        p*2
    }

    assert_eq!(2,foo4!(two=> test_foo4 ) );//выражение expr
    assert_eq!(30,foo4!(one=> test_foo4(10) ) );//выражение expr

    assert_eq!(1,foo4!(A::method));//квалифицированное имя path
    assert_eq!(1,foo4!(two=>A::method));//выражение expr

    assert_eq!(45,foo4!(i32,x,|v:i32|->i32{v+1}));// тип ty


   foo4!(pat => A{} );// образец pat
    foo4!(pat => (17, 'a') );// образец pat
    foo4!(pat =>  Some(T));// образец pat


    foo4!({let i = 9;});// единственный оператор stmt или block
    foo4!({let i = 9;let y = 9;});// единственный оператор stmt или block

    let a = A{};
    foo4!(a);// единственный оператор stmt

    //foo2!(x);
    //println!("{}", x);

    //foo3!(my_fn);
    //assert_eq!(20,my_fn(2));
}
</code></pre>
