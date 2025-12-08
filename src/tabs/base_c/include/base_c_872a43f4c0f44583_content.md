

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// Висячие указатели:
int *dangling() {
    int x = 5;
    return &x;    // ❌ Указатель на умершую переменную стека
    // Error: function returns address of local variable [-Werror=return-local-addr]
}
int main(void) {
    int *x = dangling();
    printf("x = %d \n", *x);     // 10
    return EXIT_SUCCESS;
}

```
