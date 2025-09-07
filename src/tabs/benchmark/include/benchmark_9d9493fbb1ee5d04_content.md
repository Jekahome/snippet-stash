

[Flamegraph](https://github.com/flamegraph-rs/flamegraph)

```
Install:
    sudo apt install linux-tools-common linux-tools-generic linux-tools-`uname -r`
    echo -1 | sudo tee /proc/sys/kernel/perf_event_paranoid
Run:
    cargo +nightly flamegraph --example example_doubly_linked_deque_weak  
    cargo +nightly flamegraph --test test_name
Show:
    google-chrome $PWD/flamegraph.svg    

```

Как читать Flame Graph
Нижный слой(прямоугольник, кадр стека) это вход в программы,а верхний ее листья т.е. конечные вызовы
Чем шире слой тем дольше времени он выполнялся.
Чем выше широкий слой тем хуже т.е. работа не делегировалась.
Рекомендуется устранять верхнии широкие слои корректируя код и производя замеры времени выполнения

Ширина каждого поля показывает общее время, в течение которого эта функция находится на ЦП или является частью стека вызовов. Если поле функции шире, чем у других, это означает, что она потребляет больше процессорного времени на выполнение, чем другие функции, или что она вызывается чаще, чем другие функции.
