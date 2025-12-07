

```c
// utils.h --- заголовочный файл
#ifndef UTILS_H // Защита от повторного включения
#define UTILS_H

extern int global_var;

// Объявления функций
int add(int a, int b);
int multiply(int a, int b);
void print_message(const char* message);

#endif
```
---

```c
// utils.c - реализация
#include <stdio.h>
#include "utils.h"

int global_var=9;

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

void print_message(const char* message) {
    printf("Message: %s\n", message);
}
```

---

```c
// main.c -- программа входа
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
#include "utils.h"  // Подключаем наш заголовок, для своих заголовков "file.h"

extern int global_var; // тут можно не обьявлять если в "utils.h" уже есть

int main() {
    
    printf("Сборка из нескольких файлов! %d\n",global_var);
    
    int result = add(5, 3);
    printf("5 + 3 = %d\n", result);
    
    result = multiply(4, 7);
    printf("4 * 7 = %d\n", result);
    
    print_message("Hello from multiple files!");
    
    return EXIT_SUCCESS;
}
```
