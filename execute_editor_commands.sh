#!/bin/bash

# Скрипт для выполнения команд editor-md на основе JSON файла

COMMANDS_FILE="editor-commands.json"

if [ ! -f "$COMMANDS_FILE" ]; then
    echo "Файл $COMMANDS_FILE не найден, пропускаем выполнение editor-md команд"
    exit 0
fi

echo "Найден файл $COMMANDS_FILE, выполняем команды editor-md..."

# Проверяем наличие jq
if ! command -v jq &> /dev/null; then
    echo "Ошибка: jq не установлен. Устанавливаем jq..."
    sudo apt-get update && sudo apt-get install -y jq
fi

# Читаем JSON и выполняем команды
jq -r '.[] | 
  if .type == "add-tabs" then
    "./bin/editor-md add-tabs " + (.tabs_id | map("--tabs-id " + .) | join(", "))
  elif .type == "add-tr" then
    "./bin/editor-md add-tr --tab-id " + .tab_id + " --tr-id " + .tr_id + " --position " + .position + " --tr-id-position " + .tr_id_position
  elif .type == "delete-tr" then
    "./bin/editor-md delete-tr --tab-id " + .tab_id + " --tr-id " + .tr_id
  else
    empty
  end' "$COMMANDS_FILE" | while IFS= read -r cmd; do
    echo "Выполняем: $cmd"
    if ! eval "$cmd"; then
        echo "Ошибка при выполнении команды: $cmd"
        exit 1
    fi
done

# Удаление файла после успешного выполнения
if [ -f "$COMMANDS_FILE" ]; then
    echo "Удаляем $COMMANDS_FILE после выполнения команд"
    rm -f "$COMMANDS_FILE"
fi