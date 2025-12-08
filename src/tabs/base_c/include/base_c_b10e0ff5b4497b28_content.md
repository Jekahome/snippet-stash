

Как виртуальная таблица в Rust/C++:

```

typedef struct {
    int (*open)(const char*);
    int (*close)(int);
    int (*read)(int, void*, size_t);
} FileDriver;

```

Можно подставлять разные драйверы: FAT32, EXT4, виртуальные файлы…
