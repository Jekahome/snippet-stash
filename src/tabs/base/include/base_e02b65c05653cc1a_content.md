

<pre><code class="language-rust">
struct S{x:i32,y:i32};

#[derive(Debug)]
struct S_2{x:i32,y:i32};

fn main(){
 println!("{}",stringify!(S{x:1,y:1})) ;//S { x : 1 , y : 1 }
 println!("{:#?}",S_2{x:1,y:1});  
   /*
   S_2 {
      x: 1,
      y: 1,
   }
   */

 let one_plus_one = stringify!(1 + 1);
 assert_eq!(one_plus_one, "1 + 1");
}
</code></pre>
