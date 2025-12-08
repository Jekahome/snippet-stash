

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int *addArrays(int a[], int b[], int n) {
    int *ptr = calloc(n, sizeof(int)); // выделение памяти динамически 
 
     for (int i = 0; i < n; i++)
        ptr[i] = a[i] + b[i];
 
     return ptr;
}

int main(void){
    int a[] = {3,4,5,6,7};
    int b[] = {1,1,1,1,1};
 
    int n = sizeof(a)/sizeof(a[0]);
    int *ptr = addArrays(a, b, n);
    for(int i=0;i<n;i++)
        printf("%d \t", *ptr++);
    free(ptr);
    return EXIT_SUCCESS;
}
```
