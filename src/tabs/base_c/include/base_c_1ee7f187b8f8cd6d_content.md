

```

#include <stdio.h>
#include <iso646.h>
#include <assert.h>  // для assert()
#include <stdlib.h>  // для EXIT_SUCCESS и abort(), если assert сработает

int main(void) { 
    assert(1 and 1);  // &&
    assert(0 or 1);   // ||
    assert( not 0);   // !=
    return EXIT_SUCCESS;
}
```

