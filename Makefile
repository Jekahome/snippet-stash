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