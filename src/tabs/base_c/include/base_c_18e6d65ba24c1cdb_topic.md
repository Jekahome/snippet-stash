

**profile kcachegrind**

**KCachegrind — это мощный GUI-анализатор профилировщика.**

```

sudo apt install kcachegrind
valgrind --tool=callgrind ./my_program.out // создаст файл callgrind.out.*
kcachegrind callgrind.out.*

```
---

Компиляция Rust с отладочной информацией
 
В Cargo.toml добавить:

```

[profile.release]
debug = true  # ← важно для профилирования!
```

Или компилируй так:

```

cargo build --release
# debuginfo будет включен из Cargo.toml
```
