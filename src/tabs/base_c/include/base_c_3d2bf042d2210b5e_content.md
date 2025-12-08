

```

int *p = (int[]){1, 2, 3};  // массив на стеке
struct Point *pt = &(struct Point){.x = 5, .y = 10};

```

Пример:

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

void foo(const int arr[], int n){
    for (int i=0; i<n; i++){
        printf("%d\n", arr[i]);
    }
}
int main() { 
    // инициализация указателя составным литералом массива
    int *arr = (int [5]){1,2,3,4,5};

    for (int i=0; i<5; i++){
        printf("%d\n", arr[i]);
    }
    
    // передача в функцию
    foo((int [5]){1,2,3,4,5}, 5);

    return EXIT_SUCCESS;
}
```
