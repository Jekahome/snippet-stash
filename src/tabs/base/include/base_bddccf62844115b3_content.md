

Если вы хотите получить ссылку в шаблоне match , то используйте ключевое слово ref  
<pre><code class="language-rust">
fn main(){
    let mut x = 5;
    match x {
        1 | 2 => println!("один или два"),
        3 => println!("три"),
        ref mut mr =>   foo(mr) ,// тип &mut i32
    }

    println!("global {}",x);// 9

    fn foo(l:&mut i32){
        *l=9;
        println!("foo {}",l);// 9
    }
}
</code></pre>
