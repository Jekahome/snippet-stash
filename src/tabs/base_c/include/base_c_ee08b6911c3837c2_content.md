

* printf(const char *format, ...) — выводит форматированную строку в stdout.
* fprintf(FILE *stream, const char *format, ...) — выводит форматированную строку в указанный поток.
* snprintf(char *str, size_t size, const char *format, ...) — форматированный вывод в буфер с ограничением размера.
* vprintf(const char *format, va_list ap) — аналог printf с va_list.
* vfprintf(FILE *stream, const char *format, va_list ap) — аналог fprintf с va_list.
* sprintf(char *str, const char *format, ...) — форматированный вывод в буфер (без ограничения размера).
* fscanf(FILE *stream, const char *format, ...) — чтение форматированных данных из потока.
* scanf(const char *format, ...) — чтение форматированных данных из stdin.
* sscanf(const char *str, const char *format, ...) — чтение форматированных данных из строки.
* fopen(const char *filename, const char *mode) — открывает файл с заданным режимом, возвращает FILE*.
* fclose(FILE *stream) — закрывает файл.
* fread(void *ptr, size_t size, size_t nmemb, FILE *stream) — считывает nmemb объектов размера size из потока.
* fwrite(const void *ptr, size_t size, size_t nmemb, FILE *stream) — записывает nmemb объектов размера size в поток.
* fseek(FILE *stream, long offset, int whence) — перемещает указатель текущей позиции файла.
* ftell(FILE *stream) — возвращает текущую позицию в файле.
* rewind(FILE *stream) — перемещает указатель в начало файла.
* fflush(FILE *stream) — сбрасывает буфер потока.
* fgets(char *s, int n, FILE *stream) — читает строку из потока (с ограничением длины n-1).
* fputs(const char *s, FILE *stream) — записывает строку в поток (без символа конца строки).
* gets(char *s) — устаревшая функция для чтения строки из stdin (небезопасно).
* puts(const char *s) — выводит строку в stdout с добавлением '\n'.
* getc(FILE *stream) — читает один символ из потока.
* getchar(void) — читает один символ из stdin.
* putc(int c, FILE *stream) — записывает один символ в поток.
* putchar(int c) — записывает один символ в stdout.
* ungetc(int c, FILE *stream) — возвращает символ в поток.
* feof(FILE *stream) — проверяет достижение конца файла.
* ferror(FILE *stream) — проверяет наличие ошибки потока.
* clearerr(FILE *stream) — сбрасывает флаги ошибок потока.
* perror(const char *s) — выводит сообщение об ошибке в stderr, используя strerror(errno).
* setbuf(FILE *stream, char *buf) — задает буфер потока.
* setvbuf(FILE *stream, char *buf, int mode, size_t size) — задает режим буферизации потока.
* tmpfile(void) — создает временный бинарный файл, возвращает FILE*.
* tmpnam(char *s) — создает уникальное имя временного файла.
