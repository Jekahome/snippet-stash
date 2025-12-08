

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void redirect_pointer(int **pptr, int *new_target) {
    *pptr = new_target;  // Меняем куда указывает оригинальный указатель
}

int main(void) {
    int x = 10, y = 20;
    int *ptr = &x;
    
    printf("Before: ptr points to %d\n", *ptr);  // 10
    
    redirect_pointer(&ptr, &y);  // Передаем адрес указателя
    
    printf("After: ptr points to %d\n", *ptr);   // 20
    
    return EXIT_SUCCESS;
}

```
