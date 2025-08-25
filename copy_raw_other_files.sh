#!/bin/bash

# --- Копирование .md файлов ---

# Определите корневую исходную папку для .md файлов
## SOURCE_BASE_DIR="src/tabs" 

# Определите корневую целевую папку в выходной директории mdbook
## DEST_BASE_DIR="book/tabs"

## echo "Копирование .md файлов из '$SOURCE_BASE_DIR' в '$DEST_BASE_DIR'..."

# Создаем целевую базовую директорию, если не существует
## mkdir -p "$DEST_BASE_DIR"

# Находим все .md файлы в исходной директории и копируем их, сохраняя структуру папок
## find "$SOURCE_BASE_DIR" -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
##    relative_path="${file#$SOURCE_BASE_DIR/}"
##    dest_path="$DEST_BASE_DIR/$relative_path"
##    mkdir -p "$(dirname "$dest_path")"
##    cp "$file" "$dest_path"
## done

## cp "src/SUMMARY.md" "book/"

## echo "Копирование .md файлов завершено."

# ---------------------------------------

# Определите корневую исходную папку для .md файлов
SOURCE_BASE_DIR="src/tabs"

# Определите корневую целевую папку в выходной директории mdbook
DEST_BASE_DIR="book/tabs"

echo "Копирование .md файлов из '$SOURCE_BASE_DIR' в '$DEST_BASE_DIR'..."

# Находим все .md файлы в исходной директории и копируем их, сохраняя структуру папок
rsync -a --include='*/' --include='*.md' --exclude='*' "$SOURCE_BASE_DIR/" "$DEST_BASE_DIR/"

cp "src/SUMMARY.md" "book/"

echo "Копирование .md файлов завершено."
