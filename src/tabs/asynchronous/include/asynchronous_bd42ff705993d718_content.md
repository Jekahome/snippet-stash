



Когда вы используете `async/await`, компилятор Rust автоматически генерирует сложный код на основе вашего `async fn` или `async {}` блока. Этот код включает создание структуры, которая представляет ваше асинхронное состояние, управление переходами между этими состояниями, а также механизм для хранения данных, необходимых между вызовами `.poll()`.

### Как работает `async/await` за кулисами:
1. **Генерация конечного автомата**:
   - Компилятор преобразует каждый `async fn` или `async` блок в конечный автомат (`state machine`), который имеет состояния, соответствующие вашему коду между `await` вызовами.
   - Например, если в вашем коде есть три `await`, компилятор создаст состояния для:
     - Начала выполнения,
     - После первого `await`,
     - После второго `await`,
     - Завершения выполнения.

2. **Сохранение контекста**:
   - Компилятор добавляет поля в сгенерированную структуру, чтобы хранить промежуточные значения, которые нужны между `await` вызовами.

3. **Накладные расходы**:
   - Создание и управление этим автоматом требует дополнительной памяти и времени выполнения.
   - Компилятор вынужден генерировать много дополнительного кода для управления состояниями.

### Пример накладных расходов `async/await`

<pre><code class="language-rust">
async fn example() -> u32 {
    let x = compute().await;
    let y = compute().await;
    x + y
}
</code></pre>

Компилятор генерирует структуру, которая примерно эквивалентна:

<pre><code class="language-rust">
enum ExampleState {
    Start,
    AwaitingCompute1(Pin<Box<dyn Future<Output = u32>>>),
    AwaitingCompute2(u32, Pin<Box<dyn Future<Output = u32>>>),
    Done,
}

struct ExampleFuture {
    state: ExampleState,
}

impl Future for ExampleFuture {
    type Output = u32;

    fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        match self.state {
            ExampleState::Start => {
                let fut1 = compute();
                self.state = ExampleState::AwaitingCompute1(Box::pin(fut1));
                cx.waker().wake_by_ref();
                Poll::Pending
            }
            ExampleState::AwaitingCompute1(ref mut fut1) => {
                if let Poll::Ready(val1) = fut1.as_mut().poll(cx) {
                    let fut2 = compute();
                    self.state = ExampleState::AwaitingCompute2(val1, Box::pin(fut2));
                    cx.waker().wake_by_ref();
                    Poll::Pending
                } else {
                    Poll::Pending
                }
            }
            ExampleState::AwaitingCompute2(val1, ref mut fut2) => {
                if let Poll::Ready(val2) = fut2.as_mut().poll(cx) {
                    self.state = ExampleState::Done;
                    Poll::Ready(val1 + val2)
                } else {
                    Poll::Pending
                }
            }
            ExampleState::Done => panic!("Polling after completion"),
        }
    }
}
</code></pre>

Этот автоматически созданный код работает корректно, но он имеет накладные расходы:
- Компилятор добавляет промежуточные состояния.
- Дополнительная память используется для хранения временных данных (`val1` в примере).
- Управление состояниями требует больше инструкций во время выполнения.

### Ручная реализация `Future`:
Когда вы реализуете `Future` вручную:
- Вы сами управляете состояниями, поэтому компилятор не создает конечный автомат.
- Вы можете минимизировать количество состояний и точно определить, что должно сохраняться между вызовами `poll`.
- Это снижает накладные расходы и может быть полезно в задачах, где требуется высокая производительность.

Пример выше с `OptimizedFuture` минимизирует накладные расходы за счет явного управления состоянием, что делает его более легковесным по сравнению с аналогичным кодом на `async/await`.

