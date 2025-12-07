

В заголовочном файле (.h) - **определения**
```c
// structures.h
#ifndef STRUCTURES_H
#define STRUCTURES_H

// Объявляем структуры (определение)
struct Point {
    int x;
    int y;
};

// Объявляем константы
#define MAX_SIZE 100
extern const double PI;  // только для глобальных констант

// Объявляем функции
void print_point(struct Point p);

// **ОБЪЯВЛЯЕМ** глобальные переменные (ключевое слово extern!)
extern int global_counter;
extern struct Point global_point;

#endif
```

---

В исходном файле (.c) - **реализации**
```c
// structures.c
#include "structures.h"

// **ОПРЕДЕЛЯЕМ** глобальные переменные (без extern!)
int global_counter = 0;
struct Point global_point = {0, 0};
const double PI = 3.141592653589793;

// Определяем функции
void print_point(struct Point p) {
    printf("Point(%d, %d)\n", p.x, p.y);
}
// Реализуем приватные функции/струтуры
static void print_private(struct Point p) {
    printf("Point(%d, %d)\n", p.x, p.y);
}
```
