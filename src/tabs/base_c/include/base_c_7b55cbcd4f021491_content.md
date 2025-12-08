

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#define COLS 3

void foo(int ptr[][COLS]);   // прототипы вариантов типов параметров
void foo_2(int (*ptr)[COLS]);

void print_matrix(int (*matrix)[COLS], size_t rows) {
    for (size_t i = 0; i < rows; i++) {
        for (size_t j = 0; j < COLS; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\n");
    }
}
// Если размер неизвестен на этапе компиляции
void print_dynamic_matrix(int *matrix, size_t rows, size_t cols) {
    for (size_t i = 0; i < rows; i++) {
        for (size_t j = 0; j < cols; j++) {
            printf("%d ", matrix[i * cols + j]);  // Рассчитываем индекс
        }
        printf("\n");
    }
}

int main() { 
    int matrix[][COLS] = {
        {1, 2, 3},    
        {4, 5, 6}    
    };
    int (*ptr_3)[COLS] = matrix;    // указательна на весь массив
    print_matrix(ptr_3, 2);
    print_dynamic_matrix((int*)matrix, 2, COLS);
     
    int (*ptr)[COLS] = &matrix[0];  // указательна на подмассив
 
    // приоритет `[]` выше чем `*`
    printf("%d\n", (*ptr)[0]);// 1
    printf("%d\n", (*ptr)[1]);// 2
    printf("%d\n", (*ptr)[2]);// 3

    int (*ptr_2)[COLS] = &matrix[1]; // указательна на подмассив

    printf("%d\n", (*ptr_2)[0]);// 4
    printf("%d\n", (*ptr_2)[1]);// 5
    printf("%d\n", (*ptr_2)[2]);// 6

    foo(ptr_2);
    foo_2(ptr_2);

    return EXIT_SUCCESS;
}
void foo(int ptr[][COLS]){
    printf("%d\n", (*ptr)[0]);
    printf("%d\n", (*ptr)[1]);
    printf("%d\n", (*ptr)[2]);
}
void foo_2(int (*ptr)[COLS]){
    printf("%d\n", (*ptr)[0]);
    printf("%d\n", (*ptr)[1]);
    printf("%d\n", (*ptr)[2]);
}
```
