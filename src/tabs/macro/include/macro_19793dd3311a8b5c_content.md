


<pre><code class="language-rust">
// `test!` будет сравнивать `$left` и `$right`
// по разному, в зависимости от того, как вы объявите их:
macro_rules! test {
    // Не нужно разделять аргументы запятой.
    // Можно использовать любой шаблон!
    ($left:expr; and $right:expr) => (
                 $left && $right
    );
    // ^ каждый блок должен заканчиваться точкой с запятой.
    ($left:expr; or $right:expr) => (
                 $left || $right
    );
}
fn main(){
    if test!(1i32 + 1 == 2i32; and 2i32 * 2 == 4i32){
       println!("yes");
    }else{
       println!("no");
    }

    if test!(true; or false){
       println!("yes");
    }else{
       println!("no");
    }
}
</code></pre>
