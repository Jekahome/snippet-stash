

```

#include <stdio.h>
#include <string.h> // для strlen
#include <stdlib.h> // EXIT_SUCCESS

#define LENGTH_NAME 9 // должны учесть длину ввода + 1 байт для конца строки \0
#define MY_TEXT "Женя" // компилятор сам добавит \0, компилятор превращает это в массив из 9 байт

int main(void) {
    char name[LENGTH_NAME]={};
    int letters = 0;
   
    printf("Имя:"); // имя можем ввести максимум 8 символов по байту ASCII или 4 символа двойной кодировки например кириллицы
    char fmt[20];
    sprintf(fmt, "%%%d[^\n]", LENGTH_NAME - 1);// Формируем формат строки: "%8[^\n]"
    scanf(fmt, name); // компилятор сам добавит \0
    getchar();          // Считывает и отбрасывает оставшийся '\n' с буфера

    letters = strlen(name); 
    printf("letters=%d\n", letters);

    printf("MY_TEXT length=%d\n", strlen(MY_TEXT));// 8
    return EXIT_SUCCESS;
}
 
```
