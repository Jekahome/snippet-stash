

```c
#include <stdio.h>
#include <stdbool.h>
#include <math.h> // для констант NAN и INFINITY
#include <stdlib.h> // EXIT_SUCCESS

int main(void) { 
    // За счет автоматического преобразования типов, строка преобразуется в число-мусор которое подходит под истину true
    int count = "";
    printf("%d\n", count);// -711057404
    _Bool b = count;
    printf("%d\n", b);// 1
    b = -45;
    printf("%d", b);// 1

    float f_nan = NAN; // или так = 1.0 / 0.0;
    double d_inf = INFINITY; // или так = -1.0 / 0.0;

    printf("%f\n", f_nan);// nan
    printf("%lf\n", d_inf);// inf

    b = f_nan;
    printf("%d\n", b);// 1
    b = d_inf;
    printf("%d\n", b);// 1

    return EXIT_SUCCESS;
}
```
