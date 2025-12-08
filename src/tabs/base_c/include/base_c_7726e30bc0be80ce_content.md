

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

#define LEN 40

typedef struct {
    char first[LEN];
    char last[LEN];
} Names; 

typedef struct  {
    Names handle;
    float income;
    char job[LEN];
} Guy;

int main(void){
    // присвоение без проверки длин строк
    Guy fellow = {
        {"Билли", "Боне"},
        68112.00f,
        "персональный тренер"
    };
    printf("Name: %s %s",fellow.handle.first, fellow.handle.last); // p.s. плохой код, Guy знает об устройстве Names
    return EXIT_SUCCESS;
}

```
