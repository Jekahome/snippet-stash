

```c

#include <stddef.h> // NULL
#include <stdlib.h> // malloc

int *dynamic_arr = malloc(10 * sizeof(int));
if (dynamic_arr != NULL) {
    for (int i = 0; i < 10; i++) {
        dynamic_arr[i] = i * 2;
    }
    free(dynamic_arr);  // Не забываем освободить!
}

```
