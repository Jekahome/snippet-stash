

sizeof возвращает целое число без знака (size_t) представляющее размер типа в байтах

* в C89/C90: sizeof возвращает тип unsigned int тогда спецификаторы `%u` или `%lu`
* в C99 и выше: sizeof возвращает тип size_t  тогда спецификаторы `%zu`  

А size_t — это typedef на unsigned long (`%lu`) или unsigned long long (`%llu`), в зависимости от платформы, поэтому, вы должны использовать спецификатор формата `%zu`

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    printf("sizeof(int) = %zu\n", sizeof(int)); // 4
    printf("sizeof(long double) = %zu\n", sizeof(long double)); // 16
    printf("sizeof(int) = %zu\n", sizeof(int)); // 4

    return EXIT_SUCCESS;
}
```

Пример:

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#define LENGTH_NAME 40
#define MY_TEXT "Hello" // компилятор сам добавит \0

int main(void) {
    char name[LENGTH_NAME]={};
    int size = sizeof name;
 
    printf("size=%zu\n", size);                     // 40
    printf("size=%zu\n",sizeof  MY_TEXT); // 6
 
    return EXIT_SUCCESS;
}
```

В заголовочной файле limits.h содержатся константы размерности типов

```c
#include <stdio.h>
#include <limits.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    printf("B данной системе один байт = %d бит\n",CHAR_BIT);// B данной системе один байт = 8 бит

    printf("SCHAR_MIN=%d\n",SCHAR_MIN);// -128
    printf("SCHAR_MAX=%d\n",SCHAR_MAX);// 127
    printf("UCHAR_MAX=%d\n",UCHAR_MAX);// 255

    printf("SHRT_MIN=%d\n",SHRT_MIN);// -32768
    printf("SHRT_MAX=%d\n",SHRT_MAX);// 32767
    printf("USHRT_MAX=%d\n",USHRT_MAX);// 65535
 
    printf("INT_MIN=%d\n",INT_MIN);// -2147483648
    printf("INT_MAX=%d\n",INT_MAX);// 2147483647
    printf("UINT_MAX=%u\n",UINT_MAX);// 4294967295

    printf("LONG_MIN=%ld\n",LONG_MIN);// -9223372036854775808
    return EXIT_SUCCESS;
}
```
