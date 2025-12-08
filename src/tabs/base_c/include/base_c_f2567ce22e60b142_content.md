

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) {
    FILE *file = fopen("data.bin", "rb+");
    if (!file) return EXIT_FAILURE;
    
    int numbers[] = {10, 20, 30, 40, 50};
    
    // Запись массива
    fwrite(numbers, sizeof(int), 5, file);
    
    // Перемещение к третьему элементу
    fseek(file, 2 * sizeof(int), SEEK_SET);
    
    // Чтение третьего элемента
    int third_number;
    fread(&third_number, sizeof(int), 1, file);
    printf("Третий элемент: %d\n", third_number);
    
    // Изменение третьего элемента
    fseek(file, 2 * sizeof(int), SEEK_SET);
    int new_value = 35;
    fwrite(&new_value, sizeof(int), 1, file);
    
    // Получение текущей позиции
    long position = ftell(file);
    printf("Текущая позиция: %ld\n", position);
    
    // Перемещение в начало
    rewind(file);
    
    fclose(file);
    return EXIT_SUCCESS;
}
```
