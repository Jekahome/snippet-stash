


Установка и использование sccache для кэширования сборки может сильно ускорить сборку:
```
# Установка sccache
$ cargo install sccache

# Настройка использования sccache
$ export RUSTC_WRAPPER=sccache
```
