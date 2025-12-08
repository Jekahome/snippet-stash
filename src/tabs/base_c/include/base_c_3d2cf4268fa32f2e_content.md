

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

// Функция создает массив и возвращает указатель
int* create_array(int size) {
    int *arr = malloc(size * sizeof(int));
    for (int i = 0; i < size; i++) {
        arr[i] = i * 10;  // Заполняем данными
    }
    return arr;  // Возвращаем указатель на память в куче
}

// Другая функция работает с массивом
void print_array(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    // Создаем массив в функции
    int *my_array = create_array(5);
    
    // Используем в разных местах
    print_array(my_array, 5);  // 0 10 20 30 40
    
    // Модифицируем
    my_array[2] = 999;
    print_array(my_array, 5);  // 0 10 999 30 40
    
    // Когда больше не нужен - освобождаем
    free(my_array);  // ✅ Память освобождена
    
    return EXIT_SUCCESS;
}
```
