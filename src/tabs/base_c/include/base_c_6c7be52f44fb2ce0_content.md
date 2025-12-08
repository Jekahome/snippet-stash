

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include <stddef.h> // NULL

FILE *open_file(const char *filename) {
    FILE *fp = fopen(filename, "r");
    if (fp == NULL) {
        // Ошибка - выводим в stderr
        fprintf(stderr, "Ошибка: не могу открыть файл '%s'\n", filename);
        perror("fopen");  // perror тоже пишет в stderr
    }
    return fp;
}

int main(void) {
    FILE *fp = open_file("nonexistent.txt");
    if (fp == NULL) {
        // Эта ошибка будет видна даже при перенаправлении stdout
        fprintf(stderr, "Программа не может продолжить работу\n");
        return EXIT_FAILURE;
    }
    
    printf("Файл открыт успешно\n");
    fclose(fp);
    return EXIT_SUCCESS;
}
```
