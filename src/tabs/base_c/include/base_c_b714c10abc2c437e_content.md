

```c

#include <stdio.h>
#include <math.h> // Для NAN, INFINITY, isnan, isinf, isfinite
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    float arg1 = NAN;
    double arg2 = INFINITY;
    
    // Проверка NaN
    if (isnan(arg1)) {
        printf("arg1 - это NaN\n");
    }

    // Проверка Infinity
    if (isinf(arg2)) {
        printf("arg2 - это Бесконечность\n");
    }
    
    printf("isfinite(1.0): %d\n", isfinite(1.0));   // 1

    // Пример генерации NaN
    double result_nan = 0.0 / 0.0; // или так = NAN
    
    // Пример генерации Infinity
    double result_inf = 1.0 / 0.0; // или так = INFINITY
    
    printf("0.0 / 0.0 = %f\n", result_nan);
    printf("1.0 / 0.0 = %lf\n", result_inf);

    return EXIT_SUCCESS;
}
```
