

Вы можете преобразовать Future в Stream, а затем выбрать два потока:
<pre><code class="language-rust">
extern crate futures; // 0.2.1
use futures::{Future, FutureExt, Stream, StreamExt};

fn select_stream_or_future_as_stream<S, F>(
    stream: S,
    future: F,
) -> impl Stream<Item = S::Item, Error = S::Error>
where
    S: Stream + 'static,
    F: Future<Item = S::Item, Error = S::Error> + 'static,
{
    future.into_stream().select(stream)
}
</code></pre>
