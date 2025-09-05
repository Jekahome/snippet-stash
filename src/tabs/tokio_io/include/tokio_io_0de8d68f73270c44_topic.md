

#### AsyncRead, AsyncWrite

Эти две черты предоставляют возможности для асинхронного чтения и записи в байтовые потоки.
Методы этих признаков обычно не вызываются напрямую ,вместо этого вы будете использовать их с помощью AsyncReadExt, AsyncWriteExt

[tokio/tutorial/io](https://tokio.rs/tokio/tutorial/io)

[AsyncReadExt](https://docs.rs/tokio/1.13.0/tokio/io/trait.AsyncReadExt.html)

[AsyncWriteExt](https://docs.rs/tokio/1/tokio/io/trait.AsyncWriteExt.html)
