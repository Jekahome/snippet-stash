

Применяется к:
* exit()
* abort()
* panic/assert-fail функций
* бесконечным циклам

```c

#include <stdnoreturn.h> 

_Noreturn void fatal(const char* msg) {
    puts(msg);
    exit(1);
}

// не нужно генерировать предупреждение "в функции нет return"
_Noreturn void blink_forever(void) {
    while (1) {
        toggle_led();
    }
}

```
