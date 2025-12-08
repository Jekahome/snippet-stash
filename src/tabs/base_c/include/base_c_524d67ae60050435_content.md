

```

#include <stdio.h>
#include <string.h> // для strlen
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    // это просто массив символов, а не C-строка. Попытка использовать его с функциями, ожидающими конец строки \0
    // например printf или strlen может привести к Undefined Behavior (UB)
    //char s[] = {'H', 'e', 'l', 'l', 'o'}; // компилятор ничего не добавит, надо самому позаботится о конеце строки \0
   
    // Вот правильный вариант
    char s[] = {'H', 'e', 'l', 'l', 'o', '\0'};
    s[0] = 'w';
    printf("%zu байт\n",strlen(s));// 5 - не учитывает \0
    printf("%s", s);
    for(size_t i=0; i<strlen(s); i++){
        printf("%c", s[i]);
    }

    return EXIT_SUCCESS;
}  
```
