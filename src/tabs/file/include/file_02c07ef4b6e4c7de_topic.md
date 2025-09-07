

**read_vectored**`(&mut self, bufs: &mut [IoSliceMut<'_>]) -> Result<usize>`

Подобно read(), за исключением того, что он считывается в срез буферов.

Данные копируются для заполнения каждого буфера по порядку, при этом последний записываемый буфер может быть заполнен лишь частично.

[read_vectored](https://doc.rust-lang.org/std/io/trait.Read.html#method.read_vectored)

[std::io::IoSliceMut](https://doc.rust-lang.org/std/io/struct.IoSliceMut.html)


