

#### std::cell::UnsafeCell

[struct.UnsafeCell](https://doc.rust-lang.org/std/cell/struct.UnsafeCell.html)

Структуры с внутренней изменчивостью основаны на UnsafeCell который использует сырые указатели

Любые типы с внутренней изменчивостью также должны использовать  cell::UnsafeCell обертку вокруг значений, которые могут быть изменены через общую ссылку

[interior-mutability-behind-the-curtain](https://ricardomartins.cc/2016/07/11/interior-mutability-behind-the-curtain)

