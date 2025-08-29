


<pre><code class="language-rust">
#[derive(PartialEq)]
enum BookFormat {
    Paperback,
    Hardback,
    Ebook,
}

struct Book {
    isbn: i32,
    format: BookFormat,
}

// Implement <Book> == <BookFormat> comparisons
impl PartialEq<BookFormat> for Book {
    fn eq(&self, other: &BookFormat) -> bool {
        self.format == *other
    }
}

// Implement <BookFormat> == <Book> comparisons
impl PartialEq<Book> for BookFormat {
    fn eq(&self, other: &Book) -> bool {
        *self == other.format
    }
}
impl PartialEq<Book> for Book {
    fn eq(&self, other: &Book) -> bool {
        (*self).isbn.eq(&other.isbn) && self.format.eq(&other.format)   
    }
}
fn main(){
    let b1 = Book { isbn: 3, format: BookFormat::Paperback };

    // Сравнение типов Book vs BookFormat
    assert!(b1 == BookFormat::Paperback);
    assert!(BookFormat::Ebook != b1);
    
    // Сравнение типов Book vs Book
    let b2 = Book { isbn: 3, format: BookFormat::Paperback };
    assert!(b1 == b2);
}
</code></pre>
