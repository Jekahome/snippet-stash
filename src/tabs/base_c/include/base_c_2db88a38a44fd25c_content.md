

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    double a = 5.5;       
    float b = 5.5f;     // явное использование суффикса f убирает стандартное поведение компилятора складывать double а после приводить к float
    long double c = 5.5L;  
    printf("%f %f %Lf\n", a, b, c);
    printf("%Le", c);// 5.500000e+00
   
    float planck = 6.63e-34;
    float n = .8;
    printf("%f %f" , planck, n); 

   // по умолчанию вещественные числа константы имеют тип double. Для явного использования float нужен суффикс f или F
    printf("sizeof(float)   = %zu\n", sizeof(float));          // 4 bytes
    printf("sizeof(double)  = %zu\n", sizeof(double));        // 8 bytes
    printf("sizeof(5.0)     = %zu\n", sizeof(5.0));           // 8 bytes
    printf("sizeof(5.0f)    = %zu\n", sizeof(5.0f));          // 4 bytes

{
    long long int a = 3LL;
    unsigned long long int b = 3ULL;
    unsigned long long int c = 3LLU;
    printf("%lld %llu %llu\n", a, b, c);        
}

    return EXIT_SUCCESS;
}
```

Суффиксы натуральных чисел

| Суффикс              | Тип литерала           |
| -------------------- | ---------------------- |
| `L`                  | long int               |
| `LL`                 | long long int          |
| `U`                  | unsigned int           |
| `UL` / `LU`          | unsigned long int      |
| `ULL` / `LLU` / `LU` | unsigned long long int |


Суффиксы вещественных чисел  

| Суффикс   | Тип         |
| --------- | ----------- |
| *(нет)*   | double      |
| `f` / `F` | float       |
| `l` / `L` | long double |

