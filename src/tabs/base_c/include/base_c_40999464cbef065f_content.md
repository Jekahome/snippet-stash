

```
// -Werror -Wconversion - флаги компиляции для отлова неяных преобразований с потерями
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int foo_correct(int, int); 
int main(void) {
 
   float z = (float) 5 / 3; //  Error происходит автоматическое преобразование, флаг `-Wconversion` выдаст предупреждение
   float k = (float) 5 /  (float) 3; // OK

    int result = 5/3; // OK, Усечение (дробная часть, полученная при делении двух целых чисел, отбрасывается) не относится к автоматическому преобразованию с потерей, хотя именно это и происходит

    printf("%d\n",foo_correct(1.0f, 1.0L)); // Ok. компилятор не считает, что есть потери при преобразование этих чисел в int

    // Но в этом случае хоть и нет потерь преобразования, компилятор выдает ошибку форматирования
    double d = 0.0;
    printf("%d",d);// error: format ‘%d’ expects argument of type ‘int’, but argument 2 has type ‘double’ [-Werror=format=]

    printf("%d\n",foo_correct(1.00000001f, 1.00000000000000000001L)); // Ok. Тут превышение точности типа, но это уже не про преобразование (Литералы с превышением точности - легальны в C)

    printf("%d\n",foo_correct(1.1f, 1.1L)); // Error, тут уже будут потери и компилятор с флагами не пропустит
    
    return EXIT_SUCCESS;
}
int foo_correct(int a, int b){
    return a + b;
}
```

Output:
```
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag -O0 main.c -o my_program.out

main.c: In function ‘main’:
main.c:11:31: error: conversion from ‘float’ to ‘int’ changes value from ‘1.10000002e+0f’ to ‘1’ [-Werror=float-conversion]
   11 |     printf("%d\n",foo_correct(1.1f, 1.1L)); // Error, тут уже будут потери
      |                               ^~~~
main.c:11:37: error: conversion from ‘long double’ to ‘int’ changes value from ‘1.10000000000000000002e+0l’ to ‘1’ [-Werror=float-conversion]
   11 |     printf("%d\n",foo_correct(1.1f, 1.1L)); // Error, тут уже будут потери
      |                                     ^~~~
cc1: all warnings being treated as errors
make: *** [Makefile:10: compile-gcc] Error 1
```
