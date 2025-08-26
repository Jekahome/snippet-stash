

`#[non_exhaustive]`

Полная проверка при сопоставлении с образцом — очень полезный инструмент, позволяющий обнаружить определенные ошибки во время компиляции, проверяя, все ли комбинации некоторых значений включены и учтены в исходном коде.


Атрибут `#[non_exhaustive]` в Rust используется для того, чтобы предотвратить исчерпывающее (exhaustive) сопоставление с образцом (matching) в других модулях. 

Это значит, что при использовании этого атрибута другие модули не смогут предположить, что они знают все варианты перечисления (enum) или все поля структуры, даже если они перечислены. 

Это позволяет разработчикам библиотеки добавлять новые варианты перечислений или новые поля структур в будущем без нарушения обратной совместимости.

[the-non_exhaustive-attribute](https://doc.rust-lang.org/reference/attributes/type_system.html#the-non_exhaustive-attribute)

[2008-non-exhaustive](https://rust-lang.github.io/rfcs/2008-non-exhaustive.html)
 
[using-non_exhaustive-for-non-exhaustive-rust-structs](https://turreta.com/blog/2019/12/21/using-non_exhaustive-for-non-exhaustive-rust-structs)

