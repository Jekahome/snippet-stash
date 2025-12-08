

Перечисление enum (enumeration) — это именованный набор целочисленных констант.

Каждой константе автоматически присваивается целое число (по умолчанию начиная с 0)

Тип enum в C по стандарту — int, хотя компилятор может оптимизировать размер.

Обычно enum применяют для tagged union и для кодов ошибок.

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit

typedef enum {
    ERR_NONE = 0,
    ERR_DIV_ZERO = 1,
    ERR_OVERFLOW = 100
} MathError;

int main(void){
    MathError err = ERR_OVERFLOW;

    if (err == ERR_OVERFLOW) {
        printf("ERR_OVERFLOW!\n");
    }
    return EXIT_SUCCESS;
}

```
