

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int sum(int n,  int arr[n]);// прототип
int sum(int n,  int arr[n]){
    int total = 0;
    for (int i=0;i<5; i++){
        total+=arr[i];
    }
    return total;
}

int main() { 
     
    int n = 5;
    int arr[n];
    for (int i=0;i<5; i++){
        arr[i]=1;
    }
     
    printf("sum=%d\n", sum(n, arr));// 5
    return EXIT_SUCCESS;
}
```
