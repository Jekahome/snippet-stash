

```

#include <stdio.h>
#include <string.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    char source[15] = "1234567890";
    char buff[5]; // буфер на 4 символа + '\0'

    // копируем 4 символа из source[3..6] в buff
    strncpy(buff, &source[3], 4);
    buff[4] = '\0';  // обязательно добавляем конец строки
    printf("buff: %s\n", buff); // 4567

    // копирование последних 3 символов source[7..9] в начало source
    // используем временный буфер для безопасности
    char tmp[4];
    strncpy(tmp, &source[7], 3);
    tmp[3] = '\0';
    strncpy(&source[0], tmp, 3);
    source[3] = '\0'; // обрезаем исходную строку для корректного вывода
    printf("source: %s\n", source); // 890

    return EXIT_SUCCESS;
}

```

**Вариант с memmove и memcpy должен учитывать '\0'**

```

#include <stdio.h>
#include <string.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    char source[15] = "1234567890";
    char buff[5]; // буфер на 4 символа + '\0'

    // копируем 4 символа из source[3..6] в buff
    memmove(buff, &source[3], 4);  
    buff[4] = '\0'; // ОБЯЗАТЕЛЬНО добавляем нуль

    printf("buff: %s\n", buff); // 4567

    // сдвигаем последние 3 символа source[7..9] в начало source
    memmove(&source[0], &source[7], 3);
    source[3] = '\0'; // нуль для корректной строки

    printf("source: %s\n", source); // 890

    return EXIT_SUCCESS;
}
```
