

В C массив нельзя передать по значению, он не может быть параметром функции в чистом виде.

При передаче массива в функцию он неявно преобразуется в указатель на первый элемент.

Структуру можно передавать по значению и она копируется целиком.

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    int x;
    int arr[5];
} T;

void foo(T s) {
    // s — полная копия объекта T
}

// --------------------------------------------------------------
// функция создания структуры типа T
T make_t(int x, const int arr[5]) {
    T t;
    t.x = x;

    // Копируем массив
    for (int i = 0; i < 5; i++) {
        t.arr[i] = arr[i];
    }

    return t;  // ← безопасно, t копируется
}

int main(void){
    int values[5] = {1, 2, 3, 4, 5};

    T obj = make_t(42, values);

    printf("obj.x = %d\n", obj.x);
    printf("obj.arr[2] = %d\n", obj.arr[2]);
 
    return EXIT_SUCCESS;
}

```
