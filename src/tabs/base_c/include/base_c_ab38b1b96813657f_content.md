


*   **`open()`** — открывает (или создает) файл.
    *   `int open(const char *pathname, int flags, mode_t mode);`
    *   `flags`: `O_RDONLY`, `O_WRONLY`, `O_RDWR`, `O_CREAT`, `O_TRUNC`, `O_APPEND`. **Ключевой момент:** здесь используются флаги, а не строки режима как в `fopen`.
    *   Возвращает файловый дескриптор или -1 в случае ошибки.

*   **`close()`** — закрывает файл, освобождая дескриптор.
    *   `int close(int fd);`

*   **`read()`** — читает данные из файла.
    *   `ssize_t read(int fd, void *buf, size_t count);`
    *   Читает до `count` байт из `fd` в буфер `buf`.
    *   Возвращает количество реально прочитанных байт. 0 — конец файла, -1 — ошибка.

*   **`write()`** — записывает данные в файл.
    *   `ssize_t write(int fd, const void *buf, size_t count);`
    *   Записывает `count` байт из буфера `buf` в файл `fd`.
    *   Возвращает количество реально записанных байт (которое может быть меньше `count`) или -1.

*   **`lseek()`** — изменяет позицию (смещение) в файле (аналог `fseek`).
    *   `off_t lseek(int fd, off_t offset, int whence);`
    *   `whence`: `SEEK_SET` (начало), `SEEK_CUR` (текущая позиция), `SEEK_END` (конец файла).
