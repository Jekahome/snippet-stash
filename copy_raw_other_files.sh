#!/bin/bash

# --- Копирование .md файлов ---
 
# Определите корневую исходную папку для .md файлов
SOURCE_BASE_DIR="src/tabs"

# Определите корневую целевую папку в выходной директории mdbook
DEST_BASE_DIR="book/tabs"

echo "Копирование .md файлов из '$SOURCE_BASE_DIR' в '$DEST_BASE_DIR'..."

# Находим все .md файлы в исходной директории и копируем их, сохраняя структуру папок
rsync -a --include='*/' --include='*.md' --exclude='*' "$SOURCE_BASE_DIR/" "$DEST_BASE_DIR/"

cp "src/SUMMARY.md" "book/"

cp "src/config/table-settings.json" "book/config/"

echo "Копирование .md файлов завершено."
