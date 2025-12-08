

* malloc(size_t size) — выделяет блок памяти размером size байт, возвращает указатель на него или NULL.
* calloc(size_t nmemb, size_t size) — выделяет память для массива из nmemb элементов по size байт и обнуляет её.
* realloc(void *ptr, size_t size) — изменяет размер ранее выделенного блока памяти ptr на size байт.
* free(void *ptr) — освобождает ранее выделенный блок памяти.
* abort(void) — немедленно завершает программу.
* atexit(void (*func)(void)) — регистрирует функцию func, которая будет вызвана при нормальном завершении программы.
* exit(int status) — завершает программу, вызывает функции, зарегистрированные через atexit, и flush стандартных потоков.
* getenv(const char *name) — возвращает значение переменной окружения name или NULL.
* system(const char *command) — выполняет команду shell.
* abs(int n) — возвращает абсолютное значение n.
* labs(long n) — возвращает абсолютное значение long.
* llabs(long long n) — возвращает абсолютное значение long long.
* div(int numer, int denom) — возвращает структуру {quot, rem} с результатом деления и остатком.
* ldiv(long numer, long denom) — то же для long.
* lldiv(long long numer, long long denom) — то же для long long.
* rand(void) — возвращает псевдослучайное число.
* srand(unsigned int seed) — устанавливает начальное значение для rand().
* strtol(const char *nptr, char **endptr, int base) — преобразует строку в long.
* strtoul(const char *nptr, char **endptr, int base) — преобразует строку в unsigned long.
* strtoll(const char *nptr, char **endptr, int base) — преобразует строку в long long.
* strtoull(const char *nptr, char **endptr, int base) — преобразует строку в unsigned long long.
* atof(const char *nptr) — преобразует строку в double.
* atoi(const char *nptr) — преобразует строку в int.
* atol(const char *nptr) — преобразует строку в long.
* atoll(const char *nptr) — преобразует строку в long long.
* mblen(const char *s, size_t n) — возвращает количество байт в многобайтовом символе.
* mbtowc(wchar_t *pwc, const char *s, size_t n) — конвертирует многобайтовую последовательность в wchar_t.
* wctomb(char *s, wchar_t wc) — конвертирует wchar_t в многобайтовую последовательность.
* mbstowcs(wchar_t *pwcs, const char *s, size_t n) — конвертирует строку из многобайтовых символов в массив wchar_t.
* wcstombs(char *s, const wchar_t *pwcs, size_t n) — конвертирует массив wchar_t в строку многобайтовых символов.
