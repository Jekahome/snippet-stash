


<pre><code class="language-rust">
fn main(){
//is_digit  По сравнению с is_numeric () эта функция распознает только символы 0-9, a-z и A-Z.
//is_numeric распознает странные цифры
    
    // Итерируемся по char и приводим к 10-й системе счета
    let mut chars = "123456৬".chars();

    let mut v: Vec<u32> = vec![];

    while let  Some( s) = chars.next(){
        
         if s.is_numeric() && s.is_digit(10){
            if let  Some(n) = s.to_digit(10){
               v.push(n)
            }
        }
    }
    println!("{:?}",v);// [1, 2, 3, 4, 5, 6]

    assert!('٣'.is_numeric());
    assert!('7'.is_numeric());
    assert!('৬'.is_numeric());
}
</code></pre>
