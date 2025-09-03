


<pre><code class="language-rust">
struct LazyBuffer<'a> {
    data: Cow<'a, [u8]>,
}
impl<'a> LazyBuffer<'a> {
    pub fn new(data: &'a[u8]) -> Self {
        Self {
            data: Cow::Borrowed(data),
        }
    }
    pub fn data(&self) -> &[u8] {
        &self.data
    }
    pub fn append(&mut self, data: &[u8]) {
        self.data.to_mut().extend(data)
    }
}
fn main(){
    let data = vec![0u8; 10];

    // Память еще не скопирована
    let mut buffer = LazyBuffer::new(&data);
    println!("{:?}", buffer.data());

    // Данные клонированы
    buffer.append(&[1, 2, 3]);
    println!("{:?}", buffer.data());

    // Данные не клонируются при дальнейших попытках
    buffer.append(&[4, 5, 6]);
    println!("{:?}", buffer.data());
}
</code></pre>
