

В языке C NULL — это 0

#define NULL ((void*)0)    // В C (обычно)

#define NULL 0             // В C++ или иногда в C

```

#include <stdio.h>
#include <stddef.h> // NULL
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) {
    // NULL для указателей
    int *ptr = NULL;
    if (ptr == NULL) {
        printf("ptr is NULL\n");
    }
    if(!ptr){
        printf("ptr is false\n");
    }
    
    //------------------------------------------------------------
    int *ptr2;    // НЕ инициализирован!
    if (!ptr2) {  // UB НЕПРЕДЕЛЕННОЕ ПОВЕДЕНИЕ!
        printf("ptr appears to be NULL\n");  // МОЖЕТ выполниться случайно
    } else {
        printf("ptr is not NULL: %p\n", (void*)ptr2);  // МОЖЕТ показать случайный адрес
    }
    // ЕЩЕ ХУЖЕ - если попытаться разыменовать:
    // *ptr = 42;  // (Segmentation fault, segfault) или порча чужой памяти!
   
    //------------------------------------------------------------
    // Статические и глобальные переменные автоматически инициализируются нулями (т.е. NULL для указателей)
    static int *ptr3;  // Автоматически инициализируется NULL!
    if (!ptr3) {       // Безопасно, ptr == NULL
        ptr3 = malloc(sizeof(int));
    }

    return EXIT_SUCCESS;
}

```
