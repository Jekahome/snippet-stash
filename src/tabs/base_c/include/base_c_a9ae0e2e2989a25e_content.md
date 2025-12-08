

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) { 
    int x = 5;
    int y = 3;

    int result = x/y; // OK, Усечение не относится к автоматическому преобразованию с потерей, хотя именно это и происходит

    printf("%d\n", x/y);// 1
    printf("%f\n", x/y);// 0.000000
    printf("%f\n", (float)(x/y));// 1.000000
    printf("%f\n", (float)(x)/(float)y);// 1.666667
{
    float f = (float)(x/y);
    printf("%f\n", f);// 1.000000        
}
{
    float f = (float)x/(float)y;
    printf("%f\n", f);// 1.666667       
}
    return EXIT_SUCCESS;
}
```
