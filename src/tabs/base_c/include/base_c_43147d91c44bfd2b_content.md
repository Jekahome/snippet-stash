

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

#define SQR(x) ((x) * (x))
int main(void){
    int r = SQR(5);  // → ((5)*(5))
    SQR(1 + 2)       // → ((1 + 2)*(1 + 2)) = 9  // ок  
    SQR(a++)         // опасно: многократное вычисление!
    return EXIT_SUCCESS;
}

```
