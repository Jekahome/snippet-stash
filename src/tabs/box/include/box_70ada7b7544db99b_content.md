


<pre><code class="language-rust">
use std::pin::Pin;
use std::future::Future;
use std::task::{Context, Poll};
use std::marker::PhantomPinned;
use tokio::time::{Duration, sleep};
use std::ptr::NonNull;

// Когда у вас есть структура, которая сама на себя ссылается, 
// такой код небезопасен и его невозможно скомпилировать без использования Pin.
pub mod error{
    use super::*;
    // Содержит буфер и ссылку на этот буфер (некорректный код)
    struct SelfReferential {
        buffer: String,
        // self_ref: Option<&str>, // Это вызовет ошибку, так как ссылаться на поле в той же структуре небезопасно
    }

    // Функция, которая возвращает future, асинхронно работающий с буфером
   pub async fn example_async_function() {
        let mut sr = SelfReferential {
            buffer: "Hello".to_string(),
            // self_ref: None, // Это вызовет ошибку
        };
        // sr.self_ref = Some(&sr.buffer); // Это вызовет ошибку
    }
}

pub mod success{
    use super::*;
    // Структура, содержащая строковый буфер и ссылку на этот буфер, что делает её self-referential
    struct SelfReferential {
        buffer: String,
        self_ref: Option<NonNull<String>>,// NonNull Небезопасный указатель на строку
        _marker: PhantomPinned, // Маркер, чтобы гарантировать, что структура не будет перемещена
    }

    impl SelfReferential {
        fn new(txt: &str) -> Pin<Box<SelfReferential>> {
            let sr = SelfReferential {
                buffer: txt.to_string(),
                self_ref: None,
                _marker: PhantomPinned,
            };
            // Box::pin Функция, которая закрепляет значение в памяти, гарантируя, что оно не будет перемещено.
            let mut boxed = Box::pin(sr);
            let self_ref = NonNull::from(&boxed.buffer);
            // Безопасно обновляем поле self_ref
            unsafe {
                let mut_ref = Pin::as_mut(&mut boxed);
                Pin::get_unchecked_mut(mut_ref).self_ref = Some(self_ref);
            }
            boxed
        }
    }

    // Пример асинхронной функции, использующей SelfReferential
    pub async fn example_async_function() {
        let sr = SelfReferential::new("Hello");
        println!("Buffer: {}", sr.as_ref().get_ref().buffer);
        // Используем `sleep` для симуляции асинхронной работы
        sleep(Duration::from_secs(2)).await;
        println!("Buffer after sleep: {}", unsafe { sr.as_ref().get_ref().self_ref.unwrap().as_ref() });
    }    
}


#[tokio::main]
async fn main() {
    error::example_async_function().await;
 
   // success::example_async_function().await;
}
</code></pre>
