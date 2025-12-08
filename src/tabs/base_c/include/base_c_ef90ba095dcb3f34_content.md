

* memset(void *s, int c, size_t n) — заполняет n байт области памяти значением c.
* memcpy(void *dest, const void *src, size_t n) — копирует n байт из src в dest (области не должны пересекаться).
* memmove(void *dest, const void *src, size_t n) — копирует n байт, корректно работает при перекрытии областей.
* memcmp(const void *s1, const void *s2, size_t n) — сравнение первых n байт двух областей памяти.
* memchr(const void *s, int c, size_t n) — ищет первый байт c в первых n байтах области памяти s.
* strlen(const char *s) — возвращает длину строки до символа '\0'.
* strcpy(char *dest, const char *src) — копирует строку src в dest (опасно, без проверки размера).
* strncpy(char *dest, const char *src, size_t n) — копирует максимум n символов, может не поставить '\0'.
* strcat(char *dest, const char *src) — дописывает строку src в конец dest (опасно, нет проверки размера).
* strncat(char *dest, const char *src, size_t n) — дописывает не более n символов.
* strcmp(const char *s1, const char *s2) — лексикографическое сравнение двух строк.
* strncmp(const char *s1, const char *s2, size_t n) — сравнивает первые n символов строк.
* strchr(const char *s, int c) — ищет первый символ c в строке.
* strrchr(const char *s, int c) — ищет последний символ c в строке.
* strstr(const char *haystack, const char *needle) — ищет подстроку needle в haystack.
* strpbrk(const char *s, const char *accept) — ищет первый символ из набора accept.
* strspn(const char *s, const char *accept) — количество начальных символов из accept.
* strcspn(const char *s, const char *reject) — количество начальных символов, НЕ входящих в reject.
* strtok(char *s, const char *delim) — разбивает строку на токены, используя глобальное состояние (опасно).
* strerror(int errnum) — возвращает строку-описание ошибки по номеру.
