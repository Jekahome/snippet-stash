

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void createPointer(){
    int *p = NULL;
    int n = 1;
    if(p==NULL)
    {
        p = malloc(n * sizeof(int));
        *p = 1;
    }
    printf("%d \t", (*p));
    (*p)++;
    free(p);
}
int main(void){
    createPointer();
    createPointer();
    createPointer();
    return EXIT_SUCCESS;
}

```
