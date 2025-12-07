


C99 — оптимален
```
gcc -std=c89 main.c
gcc -std=c99 main.c
gcc -std=c11 main.c
gcc -std=c17 main.c
gcc -std=c2x main.c
```
Также есть расширенные варианты от GNU:
```
-std=gnu89        C89 + GNU расширения
-std=gnu99        C99 + GNU расширения (по умолчанию в старых GCC)
-std=gnu11        C11 + GNU расширения (дефолт в современных GCC)
-std=gnu17        C17 + расширения
-std=gnu23        C23 + расширения
```

GNU-расширения — это всякие удобные вещи вроде `asm, typeof, __attribute__, #include_next` и т.д.,
которые не входят в “чистый” стандарт ISO C.

Эти стандарты — это не отдельные версии языка, а C + расширения от GCC (GNU C extensions).

То есть:
```
-std=gnu17 = -std=c17 + несколько нестандартных возможностей, специфичных для GCC.
```
