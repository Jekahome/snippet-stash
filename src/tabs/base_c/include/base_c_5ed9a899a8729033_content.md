

Смысл в том, что `mmap` делает копирование практически мгновенным для больших файлов. `mmap` вообще не читает файл сразу! Он просто говорит ядру: "если программа обратится к этим адресам, подгрузи данные с диска". А когда write читает эту память, ядро уже само разбирается с диском.

По сравнению с обычным копированием (read/write):
* Данные копируются 4 раза: диск → ядро (read) → пользовательский буфер → ядро (write) → диск
* Нужны системные вызовы для каждого блока
* Для файла размером 1 МБ (1,048,576 байт)
    * 1,048,576 / 4096 = 256 итераций
    * 256 read + 256 write = 512 системных вызовов
* Для файла 1 ГБ (1,073,741,824 байт): 
    * read/write: ~524,288 системных вызовов

```c
char buf[4096];
while((n = read(fd_in, buf, sizeof(buf))) > 0)
    write(fd_out, buf, n);
```

`mmap` копирование:
* mmap экономит тысячи/миллионы переключений между пользователем и ядром.
* Данные копируются 1 раз: диск → память процесса (через mmap)
* Ядро и процесс используют одну и ту же физическую память
* Нет копирования между ядром и пользователем
* Для файла 1 ГБ: 
    * 3 системных вызова

```c
addr = mmap(...);           // 1 вызов
write(stdout, addr, size);  // 1 вызов
munmap(addr, size);         // 1 вызов
```


```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <string.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Использование: %s <имя_файла>\n", argv[0]);
        exit(1);
    }

    // Открываем файл
    int fd = open(argv[1], O_RDONLY);
    if (fd == -1) {
        perror("open");
        exit(1);
    }

    // Получаем размер файла
    struct stat sb;
    if (fstat(fd, &sb) == -1) {
        perror("fstat");
        close(fd);
        exit(1);
    }

    // Проверка на пустой файл
    if (sb.st_size == 0) {
        close(fd);
        return 0;
    }

    // Отображаем файл в память
    char *addr = mmap(NULL, sb.st_size, PROT_READ, MAP_PRIVATE, fd, 0);
    if (addr == MAP_FAILED) {
        perror("mmap");
        close(fd);
        exit(1);
    }

    // Файловый дескриптор больше не нужен
    close(fd);

    // Записываем в stdout
    if (write(STDOUT_FILENO, addr, sb.st_size) != sb.st_size) {
        perror("write");
        munmap(addr, sb.st_size);
        exit(1);
    }

    // Освобождаем память
    munmap(addr, sb.st_size);
    
    return 0;
}

// gcc -o mmapcopy mmapcopy.c
// ./mmapcopy input.txt # вывод в терминал

// ./mmapcopy input.txt > output.txt  # копирование в файл
```

