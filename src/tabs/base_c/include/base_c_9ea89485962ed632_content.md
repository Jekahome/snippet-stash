

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void){
    
    int i = 2147483647;
    unsigned int j = 4294967295;
    printf("%d %d %d\n", i, i+1, i+2);// 2147483647 -2147483648 -2147483647
    printf("%u %u %u\n", j, j+1, j+2);// 4294967295 0 1

    return EXIT_SUCCESS;
}

```

Переполнение знакового int — поведение неопределённое в стандарте C, но на большинстве компиляторов (дополняющий код) происходит «wrap-around»
 
Решение: Проверять переполнение в ручную перед операцией:

```c

#include <limits.h>
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    int i = INT_MAX;
    if (i < INT_MAX) {
        i += 1;
    } else {
        printf("Переполнение! Нельзя прибавлять.\n");
    }
    return EXIT_SUCCESS;
}
```

