

Функция должна иметь хотя бы один именованный параметр, который обычно указывает количество передаваемых аргументов или их тип.

Нет проверки типов - компилятор не может проверить соответствие типов передаваемых аргументов.

```c

#include <stdarg.h> // va_list, va_start, va_end, va_arg
#include <stdio.h>
#include <limits.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// Макрос скрывает терминатор (флаг конца аргументов) от пользователя
#define SUM(...) sum_with_sentinel(__VA_ARGS__, INT_MIN)

int sum_with_sentinel(int first, ...) {
    int result = first;
    va_list args;
    
    va_start(args, first);
    
    int value;
    while (1) {
        value = va_arg(args, int);
        if (value == INT_MIN) break;
        result += value;
    }
    
    va_end(args);
    return result;
}
int main(void){
    // Теперь можно вызывать без явного терминатора
    printf("%d\n", SUM(10, 20, 30));     // 60
    printf("%d\n", SUM(1, 2, 3, 4, 5));  // 15
    printf("%d\n", SUM(0));              // 0
    
    // Любое количество аргументов
    printf("%d\n", SUM(1, 2));           // 3
    printf("%d\n", SUM(1));              // 1 (только первый аргумент)  

    return EXIT_SUCCESS;
}
```
