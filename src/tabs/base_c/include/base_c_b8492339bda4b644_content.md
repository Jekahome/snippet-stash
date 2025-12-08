

**Файл stack.h:**

```c

typedef struct Stack Stack; // opaque type (непрозрачный тип)

Stack* stack_create(void);
void stack_destroy(Stack* stack);
void stack_push(Stack* stack, int value);
int stack_pop(Stack* stack);
int stack_peek(const Stack* stack);
int stack_is_empty(const Stack* stack);

```

**Файл stack.c:**

```c

#include "stack.h"
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// Приватная структура
struct Stack {
    int* data;
    size_t capacity;
    size_t size;
};

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

```

**Файл main.c:**

```c

#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include "stack.h"

int main(void) {
    Stack *s = stack_create();
    if (!s) return 1;
    stack_push(s, 42);
    stack_push(s, 7);
    printf("%d\n", stack_pop(s));   // 7
    printf("%d\n", stack_pop(s));   // 42
    stack_destroy(s);
    
    // НЕТ доступа к приватным функциям resize_stack() и деталям реализации струтуры stack->data, stack->size и т.д.
    return EXIT_SUCCESS;
}

```
