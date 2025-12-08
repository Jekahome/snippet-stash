

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS

#define BLURB "Authentic imitation !"

int main(void) {
    printf("[%2s]\n", BLURB);    //[Authentic imitation !]
    printf("[%24s]\n", BLURB);   //[   Authentic imitation !]
    printf("[%24.5s]\n", BLURB); //[                   Authe]
    printf("[%-24.5s]\n", BLURB);//[Authe                   ]
    return EXIT_SUCCESS;
}

```
