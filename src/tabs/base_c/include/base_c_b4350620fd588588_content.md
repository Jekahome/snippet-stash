

```c

#include <time.h>
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) { 
    clock_t before;
    double elapsed;
    before = clock ();
    //------------------------
    int c = 0;
    for(int i =0; i<1000000;i++){
        c = i * c;
    }
    //------------------------
    elapsed = clock() - before;
    printf("function used %.3f seconds\n", elapsed/CLOCKS_PER_SEC);
    return EXIT_SUCCESS;
}
```
