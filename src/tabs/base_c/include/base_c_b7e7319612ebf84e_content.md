

Это приём, когда данные хранятся в списке макросов, а код, который зависит от этих данных, генерируется автоматически.

**Файл x-macro.h**

```c

// Создаём X-macro список — единственное место данных
#define COLOR_LIST \
    X(RED)         \
    X(GREEN)       \
    X(BLUE)

// Генерируем enum 
typedef enum {
#define X(name) name,
    COLOR_LIST
#undef X
    COLOR_COUNT
} Color;    

//-----------------------

// X-macro список:
#define ERROR_LIST \
    X(ERR_OK,           0, "No error") \
    X(ERR_TIMEOUT,      1, "Timeout")  \
    X(ERR_OVERFLOW,     2, "Overflow") \
    X(ERR_BAD_STATE,    3, "Bad state")

// Генерируем enum 
typedef enum {
#define X(name, code, msg) name = code,
    ERROR_LIST
#undef X
} ErrorCode; 

```

**Файл main.c**

```c

#include "x-macro.h"
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include <stdio.h>

// Генерируем массив строк
static const char* Color_names[] = {
#define X(name) #name,
    COLOR_LIST
#undef X
};

// Генерация массива сообщений:
static const char* Error_messages[] = {
#define X(name, code, msg) [code] = msg,
    ERROR_LIST
#undef X
};

int main(void) {
    Color c = GREEN;
    printf("Color = %s\n", Color_names[c]);  // "GREEN" 

    ErrorCode e = ERR_OVERFLOW;
    printf("Error %d: %s\n", e, Error_messages[e]);// Error 2: Overflow
    return EXIT_SUCCESS;
}

```
