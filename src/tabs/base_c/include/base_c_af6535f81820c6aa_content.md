

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdlib.h> // EXIT_SUCCESS

int *create_number() {
    int num = 42;           // Локальная переменная в стеке
    return &num;           // Возвращаем указатель на нее
}                                   // num перестает существовать здесь

int main() {
    int *ptr = create_number();  // ptr указывает на несуществующую память
    printf("%d\n", *ptr);               // Ошибка: обращение к освобожденной памяти
    
    return EXIT_SUCCESS;
}
```
