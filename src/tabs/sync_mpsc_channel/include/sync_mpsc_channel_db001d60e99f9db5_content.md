


Мы можем обернуть Receiver мьюксом и сделать его разделяемым.
<pre><code class="language-rust">
pub mod shared_channel {
use std::sync::{Arc, Mutex}; 
use std::sync::mpsc::{channel, Sender, Receiver};
    /// Потокобезопасная обертка вокруг `Receiver`.
    #[derive(Clone)]
    pub struct SharedReceiver<T>(Arc<Mutex<Receiver<T>>>);
    impl<T> Iterator for SharedReceiver<T> {
        type Item = T;
        /// Получает следующий объект от обернутого получателя.
        fn next(&mut self) -> Option<T> {
            let guard = self.0.lock().unwrap();
            guard.recv().ok()
        }
    }
    /// Создает новый канал, получатель которого может разделяться между потоками.
    /// Возвращает отправителя и получателя, как стандартная функция
    /// `channel()`, и иногда может быть подставлена вместо нее.
    pub fn shared_channel<T>() -> (Sender<T>, SharedReceiver<T>) {
        let (sender, receiver) = channel();
        (sender, SharedReceiver(Arc::new(Mutex::new(receiver))))
    } 
}
</code></pre>
