

Stream::poll_next() Функция очень похожа на Future::poll, за исключением того, что можно назвать несколько раз, чтобы получить много значений из потока.
Обычно при ручной реализации a Stream это делается путем компоновки фьючерсов и других потоков.

Поток, который выдает **()** три раза с интервалом 10 мс.
```
use tokio_stream::Stream;
use std::pin::Pin;
use std::task::{Context, Poll};
use std::time::Duration;

struct Interval {
    rem: usize,
    delay: Delay,
}
impl Stream for Interval {
    type Item = ();

    fn poll_next(mut self: Pin<&mut Self>, cx: &mut Context<'_>)
        -> Poll<Option<()>>
    {
        if self.rem == 0 {
            // No more delays
            return Poll::Ready(None);
        }
        match Pin::new(&mut self.delay).poll(cx) {
            Poll::Ready(_) => {
                let when = self.delay.when + Duration::from_millis(10);
                self.delay = Delay { when };
                self.rem -= 1;
                Poll::Ready(Some(()))
            }
            Poll::Pending => Poll::Pending,
        }
    }
}
```


Реализация потоков вручную с использованием Stream трейта может быть утомительной. 
К сожалению, язык программирования Rust пока не поддерживает async/await синтаксис для определения потоков. 
async-stream crate доступен в качестве временного решения. Этот ящик предоставляет stream! макрос, который преобразует ввод в поток. 
Используя этот ящик, указанный выше интервал можно реализовать следующим образом:
<pre><code class="language-rust">
use async_stream::stream;
use std::time::{Duration, Instant};
fn main(){
    stream! {
        let mut when = Instant::now();
        for _ in 0..3 {
            let delay = Delay { when };
            delay.await;
            yield ();
            when += Duration::from_millis(10);
        }
    }
}
</code></pre>
