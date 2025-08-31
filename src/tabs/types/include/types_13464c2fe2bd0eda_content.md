


<pre><code class="language-rust">
static  S1: i32 = 5;
  
static mut S2: i32 = 5;

fn test(){
    //print!("{}",M);//ошибка,  в этой области видимости ее нет
    unsafe {
        S2 += 1;// глобальная
        print!("{}",S2);
    }
}
fn main(){
    let  M: i32 = 5;
    test();
}
</code></pre>
