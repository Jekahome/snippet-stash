

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include <errno.h>

int main() {
    char *str = "123abc";
    char *endptr;
    errno = 0;  // Сбрасываем ошибки
    
    long num = strtol(str, &endptr, 10);
    
    // Проверяем все возможные ошибки:
    if (errno != 0) {
        perror("Ошибка strtol");
    } else if (endptr == str) {
        printf("Нечисловая строка\n");
    } else if (*endptr != '\0') {
        printf("Частично преобразовано: %ld, хвост: '%s'\n", num, endptr);
    } else {
        printf("Успех: %ld\n", num);
    }
    
    return EXIT_SUCCESS;
}
```
