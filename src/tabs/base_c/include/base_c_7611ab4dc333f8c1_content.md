

**Файл stack.h: - интерфейс**

```c

#ifndef MODULE_H
#define MODULE_H

#include <stddef.h>

typedef struct Stack Stack;// opaque type (непрозрачный тип)

Stack* stack_create(void);
void stack_destroy(Stack* stack);
void stack_push(Stack* stack, int value);
int stack_pop(Stack* stack);
int stack_peek(const Stack* stack);
int stack_is_empty(const Stack* stack);
// Публичные inline функции, которые должны иметь доступ к структуре
// но не раскрывать её пользователю
size_t stack_capacity(const Stack* s);

#endif // MODULE_H

```

**Файл stack_internal.h (НЕ экспортируется пользователю):**

```c

// Это приватный header, который включают только .c файлы этого модуля.
#ifndef MODULE_INTERNAL_H
#define MODULE_INTERNAL_H

#define MODULE_IMPLEMENTATION  // важно перед подключением stack.h
#include "stack.h"

struct Stack {
    int* data;
    size_t capacity;
    size_t size;
};

#endif

```

**Файл stack.c: — реализация**

```c

#include "stack_internal.h"
#include <stdlib.h>
#include <string.h>


// прототип функции которую мы вызовем до ее реализации
static void resize_stack(struct Stack* stack, size_t new_capacity);
 
Stack* stack_create(void) {
    Stack* s = malloc(sizeof(*s));
    if (!s) return NULL;
    s->capacity = 10;
    s->size = 0;
    s->data = malloc(s->capacity * sizeof(int));
    if (!s->data) { free(s); return NULL; }
    return s;
}

// Остальные функции...
void stack_push(Stack* stack, int value){
    if (stack->size == stack->capacity) {
        resize_stack(stack, stack->capacity * 2);
        /* лучше проверять результат расширения на NULL */
    }
    stack->data[stack->size++] = value;
}
int stack_pop(Stack* stack){
    if (stack->size == 0) {
        /* поведение по выбору: abort, возвращать ошибку и т.д. */
        return 0; /* условный ответ */
    }
    return stack->data[--stack->size];
}
void stack_destroy(Stack* stack){
    if (!stack) return;
    free(stack->data);
    free(stack);
}
int stack_peek(const Stack* stack) {
    if (stack->size == 0) return 0;
    return stack->data[stack->size - 1];
}

int stack_is_empty(const Stack* stack) {
    return stack->size == 0;
}

/* Приватная (видимая только в этом translation unit) функция */
static void resize_stack(Stack* stack, size_t new_capacity) {
    int *new_data = malloc(new_capacity * sizeof(int));
    if (!new_data) return; // простая обработка OOM; можно улучшить
    if (stack->data) {
        memcpy(new_data, stack->data, stack->size * sizeof(int));
        free(stack->data);
    }
    stack->data = new_data;
    stack->capacity = new_capacity;
}


// Инлайн-функции должны иметь доступ к полям,
// поэтому их реализацию кладём в отдельный .inl файл
#include "stack_inline.inl"

```

**Файл stack_inline.inl — реализация inline-функций:**

```c

#ifdef MODULE_IMPLEMENTATION

inline size_t stack_capacity(const Stack* s) {
    
    return s->capacity; // 
}

#endif

```

**Файл main.c: - клиент**

```c

#include "stack.h"
#include <stdio.h>

int main() {

    Stack *s = stack_create();
    if (!s) return 1;
    stack_push(s, 42);
    stack_push(s, 7);
    printf("%d\n", stack_pop(s));   // 7
    printf("%d\n", stack_pop(s));   // 42
    // Доступ только через API:
    printf("%ld\n", stack_capacity(s));// 10
    stack_destroy(s);
    
    // НЕТ доступа к resize_stack и stack->data, stack->size и т.д.
}

```

**Makefile:**

```bash

CC = gcc
CFLAGS = -Wall -Wextra -std=c99
TARGET = my_program.out
SOURCES = main.c stack.c 
OBJECTS = $(SOURCES:.c=.o)

$(TARGET): $(OBJECTS)
        $(CC) $(CFLAGS) -o $(TARGET) $(OBJECTS)

%.o: %.c
        $(CC) $(CFLAGS) -c $< -o $@

clean:
        rm -f $(OBJECTS) $(TARGET)

.PHONY: clean

# make               # Сборка
# ./my_program.out   # Запуск
# make clean         # Очистка

```
