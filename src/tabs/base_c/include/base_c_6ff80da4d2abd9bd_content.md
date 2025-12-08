

char может хранить:
- символ ASCII (0..127),
- или один байт из UTF-8-последовательности. Но НЕ сам Unicode-символ.

**Как хранить Unicode в C**

В UTF-8 в char* (строки в Linux). Каждый байт — unsigned char

```

char *s = "Привет"; // UTF-8 строка, Linux ok

```

```

#include <stdio.h>
#include <string.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    char *s = "Привет"; // UTF-8, каждый символ = 2–4 байта
    for (size_t i = 0; i < strlen(s); i++) {
        printf("%02X ", (unsigned char)s[i]); // выводим байт за байтом
    }
    printf("\n");
    return EXIT_SUCCESS;
}
```

