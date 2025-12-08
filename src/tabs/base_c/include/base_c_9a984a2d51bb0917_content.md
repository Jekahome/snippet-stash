

Значит: этот указатель — единственный способ доступа к данным, на которые он указывает.

```c

void copy(int * restrict dest, const int * restrict src, size_t n) {
    for (size_t i = 0; i < n; i++) {
        dest[i] = src[i];
    }
}

```

Оптимизатор может распараллеливать, vectorize, unroll цикл, потому что уверен:
dest и src не пересекаются.

Без restrict компилятор обязан допускать, что память может быть одна и та же: 

```c

copy(a, a, 100); // может быть aliasing
```

