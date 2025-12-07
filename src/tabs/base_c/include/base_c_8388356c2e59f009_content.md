


Способ 4. 

Используя Makefile (автоматизация предыдущих способов)
```
FILE ?= main.c utils.c stack_static/stack_static.c stack_api/stack_api.c stack_dyn/stack_dyn.c stack_bytes/stack_bytes.c hashtable_bytes/hashtable_bytes.c bst/bs_tree.c
FILE_TEST ?= stack_static/stack_static.c stack_api/stack_api.c stack_dyn/stack_dyn.c stack_bytes/stack_bytes.c hashtable_bytes/hashtable_bytes.c bst/bs_tree.c tests/test.c tests/unity/unity.c
TARGET_FILE ?= my_program.out
TARGET_FILE_TEST ?= test_my_program.out
DIAG_FLAGS = -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag

.PHONY: all

all: compile-gcc run

week: week-compile-gcc run

test: compile-gcc-test run-test

week-compile-gcc:
	gcc -std=c99 -O0 $(FILE) -o $(TARGET_FILE)

compile-gcc:
	gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security $(DIAG_FLAGS) -O0 $(FILE) -o $(TARGET_FILE)

compile-gcc-test:
	gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security $(DIAG_FLAGS) -O0 $(FILE_TEST) -o $(TARGET_FILE_TEST)

compile-clang:
	clang -fsanitize=memory -fsanitize=address $(FILE) -o $(TARGET_FILE)

run-test:
	./$(TARGET_FILE_TEST)
run:
	./$(TARGET_FILE)

run-gcc:
	valgrind --leak-check=full --track-origins=yes ./$(TARGET_FILE)

help:
	@echo "Use:"
	@echo "  make                  - compile (gcc) and run"
	@echo "  make week             - compile (gcc) and run without strong rules"
	@echo "  make FILE=test.c      - compile and run custom C file"
	@echo "  make test             - run tests"
```

 
