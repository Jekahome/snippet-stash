

**Строки методы** [all-ht.ru/inf/prog/c/func/strchr](http://all-ht.ru/inf/prog/c/func/strchr.html)

**длина строки** `size_t *strlen (const char *str);`

**копирование** строки массива: `char *strcpy (char * restrict destination, const char * restrict source);`
* strncpy – копирование строк c ограничением длины

**дублирование** строк с выделением памяти под новую строку: `char *strdup(const char *str);`
* strndup – дублирование строк с ограничением длины и выделением памяти под новую строку

**объединение** строк: `char *strcat (char *destination, const char *append);`
* strncat – объединение строк c ограничением длины добавляемой строки.

**поиск** первого вхождения строки А в строку В без учета регистра символов: `char *strcasestr (const char *strB, const char *strA);`
* strpbrk – поиск первого вхождения в строку символа из указанного множества
* strstr – поиск первого вхождения строки А в строку В

**поиск** первого вхождения символа в строку: `char *strchr (const char *str, int ch);`
* strrchr – поиск последнего вхождения символа в строку.

**сравнение строк** (сравнение строк через отношение == не работает!): `int strcmp (const char *str1, const char *str2);`
* strncmp – сравнение строк с ограничением количества сравниваемых символов

**формирование** сообщения об ошибке по коду ошибки.: `char *strerror (int errcode);`

**разбиение строки на части** по указанному разделителю: `char *strtok(char *str, const char *sep);`

Печатает строку + автоматически добавляет \n: `int puts(const char *str);`
