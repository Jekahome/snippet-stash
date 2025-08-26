


<pre><code class="language-rust">
#[allow(dead_code)]
#[derive(Clone, Copy)]
struct Book {
    // `&'static str` является ссылкой на строку, выделенную в постоянном запоминающем устройстве
    author: &'static str,
    year: u32,
}
fn borrow_book(book: &Book) {println!("{}",book.year);}
fn new_edition(book: &mut Book) {  book.year = 2014; println!("{}",book.year);}

fn main() {
    let immutabook = Book {
        author: "Douglas Hofstadter", // string literals have type `&'static str`
        year: 1979,
    };
   
    let mut mutabook = immutabook; // тут сработал Copy так как все данные тоже Copy
   
    borrow_book(&immutabook);
    borrow_book(&mutabook);
    new_edition(&mut mutabook);
}
</code></pre>
