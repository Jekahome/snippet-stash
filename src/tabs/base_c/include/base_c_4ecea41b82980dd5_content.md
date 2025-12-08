

Например, если вводить в `scanf("%s",name);` предложение разделенное пробелом либо табуляцией то все что идет после не попадет в переменную. И scanf считывает только нужные ему символы, но оставляет символ новой строки (\n) в буфере ввода, поэтому следующий вызов `scanf` не будет работать так как буфер обмена уже содержит символ новой строки (\n), к тому же если предыдущий ввод содержал пробел то весь текст после пробела перейдет на обработку к следующему scanf. 
Если вначале строки есть пробелы, то они будут пропущены и взято первое слово.

Это не рабочий вариант считывания scanf, весь ввод после пробела останется в буфере обмена и мешая следующему scanf 

А getchar() только последний символ удаляет из буфера, а не оставшуюся строку

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
#include <stddef.h> // NULL

#define LENGTH_NAME 40
int main(void) {
   // Ввод:Мария Иванова

    char name[LENGTH_NAME]={};
    printf("Полное имя:"); 
    scanf("%s",name);
    printf("%s\n", name);// Мария
    getchar();          // Считывает и отбрасывает оставшийся '\n' с буфера
    return EXIT_SUCCESS;
}

```

Рабочий вариант считывания всего ввода c ограничением длины и освобождением буфера от переноса строки 

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#define LENGTH_NAME 40
int main(void) {
   // Ввод:Мария Иванова

    char name[LENGTH_NAME]={};
    char fmt[20];
    sprintf(fmt, "%%%d[^\n]", LENGTH_NAME - 1);// Формируем формат строки: "%39[^\n]"
    printf("Полное имя:"); 
    scanf(fmt, name); // Считывает до 39 символов, пока не встретит '\n'
    printf("%s\n", name);
    getchar();          // Считывает и отбрасывает оставшийся '\n' с буфера

    return EXIT_SUCCESS;
}
```

Еще лучше вариант считывания всего ввода c ограничением длины, fgets сам очистит буфер  

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#include <string.h> // для strlen
#define LENGTH_NAME 40
int main(void) {
   // Ввод:Мария Иванова
    char name[LENGTH_NAME];
    printf("Полное имя: ");
    
    // Считывает строку, включая пробелы и '\n', безопасно.
    if (fgets(name, LENGTH_NAME, stdin) != NULL) {
        // Удаляем '\n', который был добавлен функцией fgets
        size_t len = strlen(name);
        if (len > 0 && name[len - 1] == '\n') {
            name[len - 1] = '\0';
        }
        printf("%s\n", name);
    }
    // Буфер ввода stdin уже чист!
    return EXIT_SUCCESS;
}

```
