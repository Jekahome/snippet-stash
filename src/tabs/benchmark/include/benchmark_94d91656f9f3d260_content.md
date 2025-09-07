

```toml
[profile.release]
opt-level = 0 # 0,1,2,3
debug = true

[features]
dhat-heap = []    # if you are doing heap profiling
dhat-ad-hoc = []  # if you are doing ad hoc profiling

[dependencies]
dhat = "0.3" 
```

Run:
```
cargo run --features dhat-heap
```


**Показывает занимаемую память heap в момент выполнения**

[Интерпретация результатов](https://valgrind.org/docs/manual/dh-manual.html)

Run example: 
```
cargo +nightly run --example example_linked_list_prof_heap --features dhat-heap
```

Open url [dh_view](https://nnethercote.github.io/dh_view/dh_view.html) and send file `dhat-heap.json`


```
==11514== Total:     823,849,731 bytes in 3,929,133 blocks
 ==11514== At t-gmax: 133,485,082 bytes in 436,521 blocks
==11514== At t-end:  258,002 bytes in 2,129 blocks
==11514== Reads:     2,807,182,810 bytes
==11514== Writes:    1,149,617,086 bytes
```

Первая строка показывает, сколько блоков heap и байтов было выделено за все время выполнения.

Вторая строка показывает, сколько блоков heap и байтов было активным в t-gmax момент, то есть время, когда размер heap достиг своего глобального максимума (измеряется в байтах).

Третья строка показывает, сколько блоков heap и байтов были активны на t-end момент, т. е. в конце выполнения. Другими словами, сколько блоков и байтов не было освобождено явно.

Четвертая и пятая строки показывают, сколько байтов в блоках heap было прочитано и записано за все время выполнения.

Эти строки в лучшем случае умеренно интересны. Более полезную информацию можно увидеть с помощью средства просмотра DHAT.
