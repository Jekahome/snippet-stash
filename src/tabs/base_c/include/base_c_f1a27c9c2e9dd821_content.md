

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
int main(void) {
    int a = 3;   
    printf("%d\t%f\n", a); // 3  0.000000 мусор
    printf("%d\n");// -1243254112 мусор

    return EXIT_SUCCESS;
}
```
