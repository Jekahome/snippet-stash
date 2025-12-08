

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) {
    int count = 5;
    int **array_of_pointers = malloc(count * sizeof(int*));
    
    // Создаем массив указателей на разные переменные
    for (int i = 0; i < count; i++) {
        array_of_pointers[i] = malloc(sizeof(int));
        *array_of_pointers[i] = i * 10;
    }
    
    // Используем
    for (int i = 0; i < count; i++) {
        printf("array[%d] = %p -> %d\n", 
               i, array_of_pointers[i], *array_of_pointers[i]);
    }
    
    // Чистка
    for (int i = 0; i < count; i++) {
        free(array_of_pointers[i]);
    }
    free(array_of_pointers);
    
    return EXIT_SUCCESS;
}

```
