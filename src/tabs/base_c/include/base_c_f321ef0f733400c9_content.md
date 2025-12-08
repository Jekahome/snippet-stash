

**wchar_t** в мультибайтовую строку

```

#include <wchar.h>
#include <locale.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    setlocale(LC_ALL, "en_US.UTF-8");
    
    wchar_t wide_str[] = L"Привет, мир!";
    char mb_str[100];
    
    // wchar_t → multibyte
    wcstombs(mb_str, wide_str, sizeof(mb_str));
    printf("Multibyte: %s\n", mb_str);
    
    return EXIT_SUCCESS;
}

```

**Мультибайтовой строки в wchar_t**

```

#include <wchar.h>
#include <locale.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    setlocale(LC_ALL, "en_US.UTF-8");
    
    char mb_str[] = "Привет, мир!";
    wchar_t wide_str[100];
    
    // multibyte → wchar_t
    mbstowcs(wide_str, mb_str, sizeof(wide_str) / sizeof(wchar_t));
    wprintf(L"Wide: %ls\n", wide_str);
    
    return EXIT_SUCCESS;
}

```

**С обработкой ошибок**

```

#include <wchar.h>
#include <locale.h>
#include <errno.h>
#include <stdlib.h> // EXIT_SUCCESS

int main(void) {
    setlocale(LC_ALL, "en_US.UTF-8");
    
    wchar_t wide_str[] = L"Hello 世界";
    char mb_str[100];
    size_t result;
    
    errno = 0;
    result = wcstombs(mb_str, wide_str, sizeof(mb_str));
    
    if (result == (size_t)-1) {
        perror("wcstombs failed");
        return 1;
    }
    
    printf("Converted: %s (%zu bytes)\n", mb_str, result);
    return EXIT_SUCCESS;
}
```

