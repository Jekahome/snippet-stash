PORT ?= 3001

.PHONY: all

# Определите цель all
all: commit

# Стягиваем изменения из репозитория
pull:
	git pull origin main

# Определите цель commit, чтобы делать коммит и пуш
commit:  pull
	git add .
	@git diff --cached --exit-code || git commit -m "no comment"
	git push

# Определите цель clean для очищения потенциальных временных файлов (если это актуально)
clean:
	git clean -fd

# Выполнение скрипта сборки
build:
	./copy_raw_md.sh

# Запуск локального сервера mdbook
serve:
	mdbook serve --hostname 127.0.0.1 --port $(PORT) &

# Последовательный запуск build и serve
run: serve build 

stop:
	kill $(shell lsof -t -i :$(PORT)) || echo "No process running on port $(PORT)"

# Use pull + commit + push:
# make

# Use server run:
# make run
# make run PORT=4000
# make stop
# make stop PORT=4000