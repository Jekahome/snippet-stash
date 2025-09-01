


<pre><code class="language-rust">
fn main(){
    // Преобразование char в u8
    // Так как char это Unicode равен 4 байта с диапазоном от 0 до 4294967295,  а u8 это 1 байт с диапазоном 0-255
    // То следует проверять диапазон try_into / try_from
    let c:char = 'c';
    let b:u8 = c.try_into().expect("unicode character not in u8 range");
    let b:u8 = u8::try_from('c').expect("unicode character not in u8 range");
}
</code></pre>
