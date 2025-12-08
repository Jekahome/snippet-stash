

```c

#include <stdio.h>
#include <string.h> // для strlen
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    //read-only неизменяемая строка, s указывает на литерал в памяти
     char *s = "Hello";   // компилятор сам добавит в конец строки \0
     s[0] = 'X'; // Error в Runtime (Segmentation fault)

     const char *s2 = "Hello";
     s2[0] = 'X'; // Error в момент компиляции (Segmentation fault)
     puts(s2);// Hello

     size_t size = strlen(s2);// заранее вычислим так как операция `s2++` меняет вычисляемую длину строки функцией strlen
     for(size_t i = 0; i < size; i++) {
        printf("%c", s2[i]);  // Доступ по индексу
     }
     for(size_t i =0; i < size; i++){
         printf("%c", *s2);// Hello
        s2++;
     }
     printf("%s", s2);// --- пусто так как подвинули указатель в конец строки, надо сохранять начало `char *original = s2;` для дальнейшего использования

    printf("%zu байт\n",sizeof(s));// 8 - это не размер строки, а размер указателя на 64-битной системе где адрес памяти занимает 64 бита, или 8 байт 
    printf("%zu байт\n",strlen(s));// 5

    return EXIT_SUCCESS;
}  
```
