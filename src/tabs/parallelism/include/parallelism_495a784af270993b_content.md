


<pre><code class="language-rust">
impl<T> Send for Arc<T> where T: Send + Sync + ?Sized
impl<T> Sync for Arc<T> where T: Send + Sync + ?Sized

impl<T: ?Sized + Send> Send for Mutex<T>
impl<T: ?Sized + Send> Sync for Mutex<T>
</code></pre>
Вот зачем мы оборачивали db в мьютекс: он делает вложенные данные Send и Sync — синхронизированными и отправляемыми в другой поток. 
