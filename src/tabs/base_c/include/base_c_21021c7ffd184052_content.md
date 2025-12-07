

Конечный автомат (state machine):

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    int state = 0;
start:
    printf("Состояние: %d\n", state);
    switch (state) {
        case 0:
            printf("Переходим в состояние 1\n");
            state = 1;
            goto start;
        case 1:
            printf("Переходим в состояние 2\n");
            state = 2;
            goto start;
        case 2:
            printf("Конец автомата\n");
            goto end;
    }
end:
    return EXIT_SUCCESS;
}

```

---

Выход из вложенных циклов (главное легальное применение):

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main() {
    for (int i = 0; i < 5; i++) {
        for (int j = 0; j < 5; j++) {
            printf("i=%d, j=%d\n", i, j);
            
            if (i == 2 && j == 2) {
                printf("Нашли нужное условие! Выходим из всех циклов\n");
                goto exit_all_loops;  // Чистый выход из вложенных циклов
            }
        }
    }

exit_all_loops:
    printf("Продолжаем работу после циклов\n");
    return EXIT_SUCCESS;
}

```

---

Обработка ошибок (второе легальное применение):

```
#include <stdio.h>
#include <stdlib.h>
#include <stdlib.h> // EXIT_SUCCESS
#include <stddef.h> // NULL

int main() {
    FILE *file1 = NULL, *file2 = NULL, *file3 = NULL;
    
    file1 = fopen("file1.txt", "r");
    if (file1 == NULL) {
        goto cleanup;  // Ошибка - переходим к очистке
    }
    
    file2 = fopen("file2.txt", "r");
    if (file2 == NULL) {
        goto cleanup;  // Ошибка - переходим к очистке
    }
    
    file3 = fopen("file3.txt", "r");
    if (file3 == NULL) {
        goto cleanup;  // Ошибка - переходим к очистке
    }
    
    printf("Все файлы открыты успешно!\n");
    // Работаем с файлами...
    
cleanup:
    // Централизованная очистка ресурсов
    if (file1) fclose(file1);
    if (file2) fclose(file2);
    if (file3) fclose(file3);
    printf("Ресурсы освобождены\n");
    
    return EXIT_SUCCESS;
}
```
