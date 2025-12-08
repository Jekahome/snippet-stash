

 
```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    int a = 5; 
    int b = 3; 

    float c = (float) a / (float) b;
    float c2 = (float) a / b;        // Error происходит автоматическое преобразование, флаг -Wconversion выдаст предупреждение
    float d = c / 2.0f;
    
    printf("%f",c);// 1.666667
    printf("%f",d);// 0.833333
    return EXIT_SUCCESS;
}
```
