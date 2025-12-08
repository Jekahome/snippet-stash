

При полностью буферизированном вводе буфер сбрасывается (его содержимое отправляется в место назначения), когда он полон. Буферизация такого вида обычно происходит при файловом вводе. Размер буфера за­висит от системы, но наиболее распространены значения 512 и 4096 байтов.

**Чтение/запись файлов**

```c
#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS
#include <stddef.h> // NULL

int main() {
    FILE *fp = fopen("large_file.bin", "rb");
    
    // Устанавливаем полную буферизацию 8K
    setvbuf(fp, NULL, _IOFBF, 8192);
    
    char buffer[8192];
    while (fread(buffer, 1, 8192, fp) > 0) {
        // Данные читаются блоками по 8K
        // Меньше системных вызовов = выше производительность
    }
    fclose(fp);
    return EXIT_SUCCESS;
}
```

**Сетевые сокеты**

```c
#include <stdio.h>
#include <sys/socket.h>
#include <stddef.h> // NULL

void handle_client(int sockfd) {
    FILE *sock_file = fdopen(sockfd, "r+");
    
    // Полная буферизация для сетевого трафика
    setvbuf(sock_file, NULL, _IOFBF, 4096);
    
    char data[4096];
    while (fgets(data, sizeof(data), sock_file)) {
        // Чтение больших блоков данных из сети
    }
}
```

**Высокопроизводительная обработка данных**

```c
#include <stdio.h>

void process_large_csv() {
    FILE *input = fopen("huge_dataset.csv", "r");
    FILE *output = fopen("processed.csv", "w");
    
    // Полная буферизация для ввода и вывода
    setvbuf(input, NULL, _IOFBF, 16384);  // 16K
    setvbuf(output, NULL, _IOFBF, 16384);
    
    char line[1024];
    while (fgets(line, sizeof(line), input)) {
        // Обработка данных...
        fputs(line, output);
    }
    
    fclose(input);
    fclose(output);
}
```
