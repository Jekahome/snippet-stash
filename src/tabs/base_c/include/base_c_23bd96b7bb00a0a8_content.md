

va_start(ap, last_named_arg) - Инициализирует список.

va_arg(ap, type) - Извлекает следующий аргумент указанного типа.

va_copy(dest, src) - Создаёт копию списка аргументов — редко нужно.

va_end(ap) - Закрывает список (обязателен!)

**Собственная мини-printf**

```c

#include <stdarg.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void print_values(const char* fmt, ...) {
    va_list args;
    va_start(args, fmt);

    while (*fmt) {
        if (*fmt == 'd') {
            int v = va_arg(args, int);
            printf("%d ", v);
        } else if (*fmt == 'f') {
            double v = va_arg(args, double);
            printf("%f ", v);
        }
        fmt++;
    }

    va_end(args);
}
int main(void){
    print_values("dfd", 10, 2.5, 42);
    return EXIT_SUCCESS;
}
```
