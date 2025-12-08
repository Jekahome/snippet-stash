

```

#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

typedef struct {
    const char *type;
} Msg;

void test(void *param){
    Msg *new_t = (Msg*)param;    // или просто: Msg *new_t = param;
    printf("%s\n", new_t->type);
}

int main(void){
    const char *c = "fff";

    Msg msg = {0};  // C-style zero-initialization
    msg.type = c;

    test(&msg);
    return EXIT_SUCCESS;
}

```
