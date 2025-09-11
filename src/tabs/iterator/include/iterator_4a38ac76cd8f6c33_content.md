

В настоящее время основным предполагаемым вариантом использования генераторов является реализация примитива для синтаксиса `async/await`
Всякий раз, когда генератор удаляется, он удаляет все захваченные переменные среды
Генератор выполняет свой код до команды `yield` и сохраняет свое состояние до следующего вызова resume (конечные автоматы)
```
pub trait std::ops::Generator<R = ()> {
    type Yield;
    type Return;
    fn resume(self: std::pin::Pin<&mut Self>, resume: R) -> std::ops::GeneratorState<Self::Yield, Self::Return>;
}
pub enum std::ops::GeneratorState<Y, R> {
    Yielded(Y),
    Complete(R),
}
```
Где `std::pin::Pin` это тип реализующий
