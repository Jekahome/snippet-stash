

<pre><code class="language-rust">
fn main(){
    let country = String::from("Austria");
    let country_ref = &country;
    let country = 8;
    println!("{country_ref} {country}");// Austria 8 
    // т.е. первая переменная country не удалилась, а затенилась раз ее ссылка country_ref и показывает ее значение 
}
</code></pre>

Единственный способ вернуть образно затененную переменную это восстановить ее по ее ссылке
`let country:String = country_ref.to_string();`

