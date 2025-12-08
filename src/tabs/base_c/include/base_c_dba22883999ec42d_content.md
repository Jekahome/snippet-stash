

```

#include <stdio.h>
#include <string.h> // для strlen
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    char s[10] = {};  // массив инициализируется нулями так что добавлять \0 ненужно
    s[0] = 'H'; 
    s[1] = 'e'; 
    s[2] = 'l'; 
    s[3] = 'l'; 
    s[4] = 'o'; 
 
    printf("%zu байт\n",sizeof(s));// 10 - учитывает \0 в конце и все нули после инициализации
    printf("%zu байт\n",strlen(s));// 5 - не учитывает \0 т.е. фактическая строка занятая символами, а не нулями

    s[2] = '\0'; 
    printf("%zu байт\n",strlen(s));// 2 - осталось 2 символа, а после мы оборвали концом строки \0
    return EXIT_SUCCESS;
}  
```
