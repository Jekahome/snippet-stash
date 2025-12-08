

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
#include <string.h>

int main(void) {
    // 1. Создаём строку начального размера
    size_t size = 16;                 // начальный размер
    char *str = malloc(size);         // выделяем память
    if (!str) {
        perror("malloc");
        return 1;
    }

    str[0] = '\0';                    // делаем строку пустой

    // 2. Записываем что-то внутри
    strcpy(str, "Hello");
    printf("str = %s\n", str);

    // 3. Проверяем — хотим добавить ещё текст, но места мало —
    // делаем расширение через realloc
    const char *addition = ", world!";

    // считаем требуемую длину: текущая длина + длина добавки + '\0'
    size_t needed = strlen(str) + strlen(addition) + 1;

    if (needed > size) {
        // увеличиваем буфер
        char *tmp = realloc(str, needed);
        if (!tmp) {
            perror("realloc");
            free(str);
            return 1;
        }
        str = tmp;
        size = needed;
    }

    // 4. Добавляем новый текст
    strcat(str, addition);

    printf("expanded str = %s\n", str);

    // 5. Освобождаем память
    free(str);

    return EXIT_SUCCESS;
}
```
