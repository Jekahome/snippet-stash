

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

// Чтобы избежать проблем при использовании макроса в сложных выражениях
// Конструкция do { ... } while(0) считается best practice для многострочных макросов в C, чтобы макрос подставлялся как одна инструкция.
// не указываем вконце - ; что бы при развертывании в многострочных конструкциях не ломался синтаксис
#define DEBUG_LOG(fmt, ...) do { \
    printf("[%s:%d] ", __FILE__, __LINE__); \
    printf(fmt, ##__VA_ARGS__); \
    printf("\n"); \
} while(0)
 
int main(void) {
    
    char *x = "message";
    int digit = 9;
    if (1){
        // Использование
        DEBUG_LOG("Variable x = %s", x);
        DEBUG_LOG("Variable dig = %d", digit);
        DEBUG_LOG("Function started");
    }
    else{
        printf("something");        
    }
 
    return EXIT_SUCCESS;
}

```
