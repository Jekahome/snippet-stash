

```

#include <fcntl.h>   // для open, O_RDONLY, O_WRONLY, O_CREAT
#include <unistd.h>  // для read, write, close
#include <stdio.h>   // для perror
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main() {
    int source_fd, dest_fd;
    ssize_t bytes_read;
    char buffer[4096]; // Буфер размером 4KB

    // 1. ОТКРЫТИЕ
    // Открываем исходный файл только для чтения
    source_fd = open("source.txt", O_RDONLY);
    if (source_fd == -1) {
        perror("Failed to open source.txt");
        return EXIT_FAILURE;
    }

    // Создаем/перезаписываем целевой файл с правами rw-r--r--
    dest_fd = open("dest.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
    if (dest_fd == -1) {
        perror("Failed to open dest.txt");
        close(source_fd);
        return EXIT_FAILURE;
    }

    // 2. ЧТЕНИЕ и ЗАПИСЬ
    // Цикл чтения-записи
    while ((bytes_read = read(source_fd, buffer, sizeof(buffer))) > 0) {
        ssize_t bytes_written = write(dest_fd, buffer, bytes_read);
        if (bytes_written != bytes_read) {
            perror("Write error");
            close(source_fd);
            close(dest_fd);
            return EXIT_FAILURE;
        }
    }

    // Проверяем, не завершилось ли чтение с ошибкой
    if (bytes_read == -1) {
        perror("Read error");
    }

    // 3. ЗАКРЫТИЕ
    close(source_fd);
    close(dest_fd);

    return EXIT_SUCCESS;
}
```
