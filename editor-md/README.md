# Генерация данных для TAB и вставки TR

Для возможности расширять ячейки TR и создавать новые TAB

## Build

```sh
cargo build --release
```

Исполняемый файл `editor-md/target/release/editor-md` поместить в папку `/bin`


## Use

```sh
./bin/editor-md add-tabs --tabs-id tab_1, tab_2
./bin/editor-md add-tr --tab-id tab_8 --tr-id tab_8_new --position after --tr-id-position tab_8_469b61eeeb666c72
./bin/editor-md add-tr --tab-id tab_8 --tr-id tab_8_new --position before --tr-id-position tab_8_469b61eeeb666c72

```