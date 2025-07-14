#!/bin/bash

# --- Копирование .md файлов ---

# Определите корневую исходную папку для .md файлов
SOURCE_BASE_DIR="src/tabs" 

# Определите корневую целевую папку в выходной директории mdbook
DEST_BASE_DIR="book/tabs"

echo "Копирование .md файлов из '$SOURCE_BASE_DIR' в '$DEST_BASE_DIR'..."

# Создаем целевую базовую директорию, если не существует
mkdir -p "$DEST_BASE_DIR"

# Находим все .md файлы в исходной директории и копируем их, сохраняя структуру папок
find "$SOURCE_BASE_DIR" -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
    relative_path="${file#$SOURCE_BASE_DIR/}"
    dest_path="$DEST_BASE_DIR/$relative_path"
    mkdir -p "$(dirname "$dest_path")"
    cp "$file" "$dest_path"
done

cp "src/SUMMARY.md" "book/"

echo "Копирование .md файлов завершено."

# --- Копирование wasm-файлов ---

# SOURCE_JS_DIR="src/js"
# DEST_JS_DIR="book/js"
# FILES=("md_wasm.js" "md_wasm_bg.wasm")

# echo "Копирование wasm-файлов из '$SOURCE_JS_DIR' в '$DEST_JS_DIR'..."

# Создаем директорию book/js, если не существует
# mkdir -p "$DEST_JS_DIR"

# for file in "${FILES[@]}"; do
#     src="$SOURCE_JS_DIR/$file"
#     dest="$DEST_JS_DIR/$file"
#     if [[ -f "$src" ]]; then
#         cp "$src" "$dest"
#         echo "$file скопирован"
#     else
#         echo "$file не найден в $SOURCE_JS_DIR"
#     fi
# done

# echo "Копирование wasm-файлов завершено."