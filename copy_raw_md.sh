#!/bin/bash

# Определите корневую исходную папку для .md файлов
# Путь относительный к корневой папке вашего mdbook проекта
SOURCE_BASE_DIR="src/tabs" 

# Определите корневую целевую папку в выходной директории mdbook
# Путь относительный к корневой папке вашего mdbook проекта
DEST_BASE_DIR="book/tabs"

echo "Копирование .md файлов из '$SOURCE_BASE_DIR' в '$DEST_BASE_DIR'..."

# Создаем целевую базовую директорию, если она не существует
mkdir -p "$DEST_BASE_DIR"

# Находим все .md файлы в исходной директории и копируем их, сохраняя структуру папок
find "$SOURCE_BASE_DIR" -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
    # Определяем относительный путь файла от SOURCE_BASE_DIR
    relative_path="${file#$SOURCE_BASE_DIR/}"
    
    # Определяем полный путь назначения
    dest_path="$DEST_BASE_DIR/$relative_path"
    
    # Создаем родительские директории для файла назначения, если они не существуют
    mkdir -p "$(dirname "$dest_path")"
    
    # Копируем файл
    cp "$file" "$dest_path"
done

echo "Копирование завершено."