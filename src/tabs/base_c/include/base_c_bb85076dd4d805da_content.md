

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) {
    int a = 1, b = 2, c = 3;
    int *arr[3] = {&a, &b, &c};  // Массив указателей
    
    for (int i = 0; i < 3; i++) {
        printf("arr[%d] = %p, *arr[%d] = %d\n", 
               i, arr[i], i, *arr[i]);
    }
    
    return EXIT_SUCCESS;
}

```
