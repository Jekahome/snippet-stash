

Вы можете использовать **sprintf**, чтобы сделать это, или, может быть, **snprintf**, если он у вас есть:

```

char str[ENOUGH];
sprintf(str, "%d", 42);

```

Где количество символов (плюс завершающий символ) в str может быть вычислено с помощью:

`(int)((ceil(log10(num))+1)*sizeof(char))`

---

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#define MAX_LEN 256
int main(void){
    char my_string[MAX_LEN]; // Ваш буфер для результата
i    nt answer = 42;

    // snprintf записывает результат в my_string
    snprintf(my_string, MAX_LEN, "Ответ: %d. Результат: %d", answer, 100);

    // my_string теперь содержит строку "Ответ: 42. Результат: 100"
    printf("Сформированная строка: %s\n", my_string);
    return EXIT_SUCCESS;
}
```
