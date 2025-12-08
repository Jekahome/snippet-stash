

```

#include <stdio.h>
#include <stdlib.h> // malloc, EXIT_SUCCESS
#include <stddef.h> // NULL

int main() {

    // calloc - автоматическое запонение нулями
    size_t array_size = 100;
    int *arr = calloc(array_size, sizeof(*arr));
    // arr уже заполнен нулями

    // Не забываем освободить!
    free(arr);
    arr = NULL;  // Хорошая практика

    return EXIT_SUCCESS;
}
```
