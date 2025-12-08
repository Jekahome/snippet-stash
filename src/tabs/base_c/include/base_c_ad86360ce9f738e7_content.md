

Файл data.txt с содержимым:

```

Иван 25 50000.50
Мария 30 75000.75

```

Файл main.c:

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) {
    FILE *file = fopen("data.txt", "r");
    if (!file) {
        printf("Ошибка открытия файла\n");
        return EXIT_FAILURE;
    }
    
    char name[50];
    int age;
    double salary;
    
    // Чтение первой строки
    fscanf(file, "%49s %d %lf", name, &age, &salary);
    printf("Прочитано: %s, %d, %.2f\n", name, age, salary);
    
    // Чтение второй строки  
    fscanf(file, "%49s %d %lf", name, &age, &salary);
    printf("Прочитано: %s, %d, %.2f\n", name, age, salary);
    
    fclose(file);
    return EXIT_SUCCESS;
}

```

**Чтение неизвестного количества строк**

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main() {
    FILE *file = fopen("data.txt", "r");
    if (!file) return EXIT_FAILURE;
    
    char name[50];
    int age;
    double salary;
    int line_count = 0;
    
    // fscanf возвращает количество успешно прочитанных элементов
    while (fscanf(file, "%49s %d %lf", name, &age, &salary) == 3) {
        line_count++;
        printf("Строка %d: %s, %d лет, зарплата %.2f\n", 
               line_count, name, age, salary);
    }
    
    printf("Всего прочитано строк: %d\n", line_count);
    fclose(file);
    return EXIT_SUCCESS;
}
```
