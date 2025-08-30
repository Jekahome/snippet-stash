

<pre><code class="language-rust">
fn main(){
// это последовательность разных типов фиксированного размера
    let multi:(i32,&'static str,char) = (1,"hi",'s');
    print!("i32 = {} \n &str = {} \n char = {}\n",multi.0,multi.1,multi.2 );
    let (x , y, z) = multi; // деконструкция
    let (_ , _, z) = multi;// деконструкция с пропуском
   print!(" char = {}\n",z );
}
</code></pre>

---

<pre><code class="language-rust">
fn cortege(c:(i32,&str,char))->(i32,&str,char){
   // единичный тип одноэлементный кортеж
     let multi  = (0,);// убрать неоднозначность с (0) кортежем через запятую
    print!("единичный тип одноэлементный кортеж {}\n",multi.0);

    // доступ через индексы
    print!("i32 = {} \n &str = {} \n char = {}\n",c.0,c.1,c.2 );

    // доступ через деконструкцию
    let (x , y, z) = c;

    print!("i32 = {} \n &str = {} \n char = {}\n",x,y,z );

    (x , y, z)
}
fn main(){
    let multi:(i32,&'static str,char) = (1,"hi",'s');

    assert_eq!(multi, cortege(multi));
}
</code></pre>

