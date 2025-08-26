


<pre><code class="language-rust">
fn main() {
    //Можно объявить имя, связанное с указателем на функцией
    let f_out: fn(i32,i32) -> i32; 
    let f_show: fn(i32,i32); 

    f_out = get_sum;
    f_show = show_sum;

    println!("сумма чисел: {}",f_out(10, 6));

    println!("----------\n");

    f_show(10, 6);
}
</code></pre>
