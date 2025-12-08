

```

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void) {
    FILE *file = fopen("buffered.txt", "w");
    
    // Установка размера буфера
    char buffer[1024];
    setvbuf(file, buffer, _IOFBF, sizeof(buffer));
    
    // Типы буферизации:
    // _IOFBF - полная буферизация
    // _IOLBF - построчная буферизация  
    // _IONBF - без буферизации
    
    fprintf(file, "Это буферизированная запись\n");
    
    // Принудительная запись буфера
    fflush(file);
    
    fclose(file);
    return EXIT_SUCCESS;
}
```
