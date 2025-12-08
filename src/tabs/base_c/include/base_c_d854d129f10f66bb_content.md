

```

#include <stdio.h>
#include <locale.h> // для русского языка
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

int main(void){
    int *link;// создание указателя для int данных
    int origin = 10;
    link = &origin;// взятие адреса.Указатель link теперь содержит адрес значения переменной origin
    int new_value = *link;// разыменование адреса. Присваивание/копирование значения в new_value данных по адресу link
    (*link)++;
    printf("Указатели: %d %d адрес:%p данные:%d \n",origin,new_value,link,*link);
    return EXIT_SUCCESS;
}

```
