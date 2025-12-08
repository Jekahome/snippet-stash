

```c

#include <stdio.h>
#include <string.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    unsigned char source[10] = {1,2,3,4,5,6,7,8,9,10};
    unsigned char dest[10];

    // memcpy — копируем весь массив (не пересекается)
    memcpy(dest, source, sizeof(source)); // или memcpy(dest, source, 10 * sizeof(unsigned char)); 

    // memmove — безопасно при пересечении
    memmove(&source[2], &source[0], 5); // сдвигаем первые 5 байт на 2 позиции

    // выводим массив для проверки
    for (int i = 0; i < 10; i++)
        printf("%d ", source[i]);
    printf("\n");

    return EXIT_SUCCESS;
}
```
