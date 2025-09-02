


<pre><code class="language-rust">
use std::collections::BTreeSet;
fn main() {
    let mut books:BTreeSet<&str> = BTreeSet::new();
   // let set: BTreeSet<_> = [1, 2, 3].iter().cloned().collect();

// Add some books.
    books.insert("A Dance With Dragons");
    books.insert("To Kill a Mockingbird");
    books.insert("The Odyssey");
    books.insert("The Great Gatsby");

// Check for a specific one.
    if !books.contains("The Winds of Winter") {
        println!("We have {} books, but The Winds of Winter ain't one.", books.len());
    }

// Remove a book.
    books.remove("The Odyssey");

// Iterate over everything.
    for book in &books {
        println!("{}", book);
    }
}
</code></pre>
