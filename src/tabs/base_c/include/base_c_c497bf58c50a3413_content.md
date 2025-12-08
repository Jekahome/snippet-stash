

**while**

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) { 
    int count = 5;
    while (count > 0) {
        printf("%d ", count); 
        count--;  
    }

    count = 5;
    while (--count);
    printf("%d",count);// 0
    return EXIT_SUCCESS;
}
```

**do while**

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) { 
    int num = 0;
    do {
        printf("Выполняется один раз.\n");
        num++;
    } while (num < 0);
    return EXIT_SUCCESS;
}
```
