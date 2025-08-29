


<pre><code class="language-rust">
use std::io;
use std::fs;

// Каждая переменная содержит значения только одного типа. В нашем примере stdin имеет тип Stdin, file имеет тип File и readable имеет тип &mut dyn Read
fn main(){
 let (mut stdin_read, mut file_read);

 let readable: &mut dyn io::Read = if arg == "-" {
    stdin_read = io::stdin();
    &mut stdin_read
 } else {
    file_read = fs::File::open(arg)?;
    &mut file_read
 };
}
</code></pre>

**Преимущества**

Нам не нужно ничего размещать в куче. 
Нам также не нужно инициализировать что-то, что мы не будем использовать позже, и нам не нужно мономорфизировать весь следующий код для работы с обоими File или Stdin.

----
 
Версия аналогичного кода но с выделением памяти в куче:
<pre><code class="language-rust">
fn main(){
 let readable: Box<dyn io::Read> = if arg == "-" {
    Box::new(io::stdin())
 } else {
    Box::new(fs::File::open(arg)?)
 };
}
</code></pre>

 
