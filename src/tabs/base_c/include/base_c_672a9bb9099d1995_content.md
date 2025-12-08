

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

int main(void) {
    // Указатель на функцию
    int (*operation)(int, int);
    
    operation = add;
    printf("5 + 3 = %d\n", operation(5, 3));  // 8
    
    operation = multiply;
    printf("5 * 3 = %d\n", operation(5, 3));  // 15
    
    return EXIT_SUCCESS;
}

```
