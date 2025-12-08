

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include <stddef.h> // NULL

void allocate_memory(int **pptr) {
    *pptr = malloc(sizeof(int));  // Меняем оригинальный указатель
    **pptr = 42;
}

int main(void) {
    int *ptr = NULL;
    allocate_memory(&ptr);  // Передаем адрес указателя!
    
    printf("Value: %d\n", *ptr);  // 42
    free(ptr);
    return EXIT_SUCCESS;
}

```
