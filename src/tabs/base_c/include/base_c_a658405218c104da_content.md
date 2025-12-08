

```

#include <stdio.h>
#include <time.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

void log_message(const char *msg) {
    printf("[INFO] %s\n", msg);  // Обычные логи - буферизуются
}

void log_error(const char *err) {
    fprintf(stderr, "[ERROR] %s\n", err);  // Ошибки - сразу
}

int main() {
    log_message("Программа запущена");
    
    for (int i = 0; i < 5; i++) {
        log_message("Выполняется итерация...");
        sleep(1);
        
        if (i == 2) {
            log_error("Обнаружена проблема!");
        }
    }
    
    log_message("Программа завершена");
    return EXIT_SUCCESS;
}
```
