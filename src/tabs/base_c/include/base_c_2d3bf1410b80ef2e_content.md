

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

struct Buffer {
    size_t size;
    int data[]; // (FAM) По стандарту C массив должен быть последним полем структуры
};
int main(){
   // выделение памяти под саму струтуру `sizeof(struct Buffer)` и плюс для массива `100`
   size_t count = 100;
   size_t total = sizeof(struct Buffer) + count * sizeof(int);
   struct Buffer *b = malloc(total);
   if (!b) { 
       /* обработка ошибки */ 
       return 1;
   }
 
   b->size = 100;
   memcpy(b->data, some_data, b->size * sizeof(b->data[0]));
   free(b);

   return EXIT_SUCCESS;
}

```

**Иначе можно хранить указатель в структуре и ему выделить память**

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include <string.h>

struct Buffer {
    size_t size;
    int *data;
};

int main(void) {

    //int arr_init[5] = { [0 ... 4] = 1 }; // короткий способ

    size_t size = 5;
    int arr_init[size];
    
    memset(arr_init, 0, sizeof arr_init);// заполнить нулями

    /*
    // для заполнения массива не нулями
    for (size_t i=0; i < size; i++) {
         arr_init[i] = 1;
    }*/
    
    struct Buffer buff = {.size=size, .data=arr_init};
    printf("%d",buff.data[0]);

    return EXIT_SUCCESS;
}

```
