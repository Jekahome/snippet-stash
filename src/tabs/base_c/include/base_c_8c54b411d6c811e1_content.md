

```c

int is_little_endian() {
    int x = 1;
    return *(char*)&x; // Вернёт 1 на LE, 0 на BE
}

```
