

`'label: loop {}`    Метка цикла, полезна для управления потоком во вложенных циклах.

`break x`              То же самое, но сделать x значение выражения цикла (только в реальном цикле).

`break 'label`       Выйти не только из этого цикла, но и из цикла, помеченного 'label.

`break 'label x`    То же самое, но сделайте x значением охватывающего цикла, отмеченным знаком 'label.

`continue`            Продолжить выражение REF до следующей итерации цикла этого цикла.

`continue 'label`  То же самое, но вместо этого цикла заключительный цикл отмечен 'label.

<pre><code class="language-rust">
fn main(){
let mut i:i32=0;
let mut y:i32=4;

'outer: loop {
    i=0;
    y-=1;
    println!("----------------- y:{}",y);
    if y==0{
        break;
    }
    loop{
        println!("i:{}",i);
        i+=1;
        if i>10{
            continue 'outer;
        }
    }
}
 
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
 'outer: for i in 0..4 {
    for j in i..i+2 {
        println!("{} {}", i, j);
        if i > 1 {
            continue 'outer;
        }
    }
    println!("--");
 }
}
</code></pre>
