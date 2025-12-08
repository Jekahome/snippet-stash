

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#define NELEMS(array) (sizeof(array) / sizeof(array[0]))

int main(){
    char arr[5];// 0,0,0,0,0
    size_t array_length = NELEMS(arr);
    printf("Length=%ld\n", array_length); // 5
    
    for (size_t i=0; i < array_length; i++) {
       printf("%d",arr[i]);
    }

    return EXIT_SUCCESS;
}
```
