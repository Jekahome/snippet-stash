

```c
#include <stdio.h>
#include <float.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    // Минимальное количество значащих десятичных цифр для типа floa t
    printf("FLT_DIG=%d\n",FLT_DIG);// 6

    // Количество битов в мантиссе типа float
    printf("FLT_MANT_DIG=%d\n",FLT_MANT_DIG);// 24

    // Минимальное значение для положительного числа типа float, сохраняющего полную точность
    printf("FLT_MIN=%e\n",FLT_MIN);//  1.175494e-38
     
    // Максимальное значение для положительного числа типа float, сохраняющего полную точность
    printf("FLT_MAX=%f\n",FLT_MAX);// 340282346638528859811704183484516925440.000000
     
    // Наибольшее значение типа double
    printf("DBL_MAX=%e\n",DBL_MAX);// 1.797693e+308
    return EXIT_SUCCESS;
}
```
