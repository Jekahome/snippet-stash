

```

#include <stdio.h>
#include <string.h> // для strlen
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    // массив char[6], можно менять в пределах выделенной памяти
    char s[] = "Hello";  // компилятор сам добавит в конец строки \0
    
    s[0] = 'h';          

    printf("%zu байт\n",sizeof(s));// 6 - учитывает \0 в конце 
    printf("%zu байт\n",strlen(s));// 5 - не учитывает \0

   // вывод строки
   printf("%s", s);

   // посимвольный вывод
    for(size_t i=0; i<strlen(s); i++){
        printf("%c", s[i]);
    }
    return EXIT_SUCCESS;
}  
```
