

```

#include <stdio.h>
#include <stdlib.h> // malloc, EXIT_SUCCESS

int main() {

    size_t current_size = 10;
    int *dynamic_array = malloc(current_size * sizeof(*dynamic_array));

    // Увеличиваем массив
    size_t new_size = current_size * 2;
    int *temp = realloc(dynamic_array, new_size * sizeof(*dynamic_array));

    if (temp == NULL) {
        // realloc失敗 - старый указатель все еще валиден
        free(dynamic_array);
        fprintf(stderr, "Не удалось увеличить массив\n");
        return EXIT_FAILURE;
    } else {
        dynamic_array = temp;  // Используем новый указатель
        current_size = new_size;
    }

    // Не забываем освободить!
    free(dynamic_array);
    dynamic_array = NULL;  // Хорошая практика
    return EXIT_SUCCESS;
}
```
