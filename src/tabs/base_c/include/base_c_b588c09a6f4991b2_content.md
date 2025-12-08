



Применение: Колбэки (callback)

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit
 
// Callback — функция сравнения двух чисел
int cmp_int(const void* a, const void* b) {
    int x = *(const int*)a;
    int y = *(const int*)b;
    return x - y;  // если > 0, переставить
}
int main(void){

    int arr[] = { 5, 2, 9, 1, 3 };
    size_t n = sizeof(arr) / sizeof(arr[0]);

    // Передаём указатель на функцию cmp_int
    qsort(arr, n, sizeof(int), cmp_int);
    // определение qsort ожидает указатель на функцию
    // typedef int (*__compar_fn_t) (const void *, const void *);

    for (size_t i = 0; i < n; ++i) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    return EXIT_SUCCESS;
}

```

