

```c

#include <stdio.h>
#include <locale.h> // для русского языка
#include <string.h> // для функций strcpy( ), strcat( ), strlen( ) и strcmp( ) 
#include <unistd.h>  // для sleep
#include <stdlib.h> // EXIT_SUCCESS
#include <stddef.h> // NULL

// обьявление функций которе будут использоваться из string.h
char *strcasestr (const char *strB, const char *strA);

int main(void){
setlocale(LC_ALL, "Rus"); // для русского языка
// определение длины строки
// size_t *strlen (const char *str);
char *str_point="Строка";
printf("Длина строки=%ld", strlen(str_point));// 12

// копирование строки массива
// char *strcpy (char * restrict destination, const char * restrict source);// указатель destination должен быть предварительно инициализирован!
// restrict указывает на недо­пустимость копирования строки в саму себя
    //char from_str[] = {'t', 'h', 'r', 'e', 'e', '\0'};
    const char* from_str = "three";
    char to_buff[10];
    strcpy(to_buff,from_str);
    strncpy(to_buff,from_str, 6); // т.е. +1 байт для нулевого символа
    to_buff[0]= 'T';
    printf("%s\n",to_buff);// Three

// дублирование строк с выделением памяти под новую строку
// char *strdup(const char *str);
char *to_buff2;
to_buff2 = strdup(from_str);
printf("%s\n",to_buff2);// three

// объединение строк
// char *strcat (char *destination, const char *append);
char to_str2[10] = {'a','b'};// или = "ab"
char from_str2[10] = {'c','d'};// или = "cd"
strcat(to_str2, from_str2); // увеличивает первую строку, добавляя ей в конец начало второй строки
printf("%s\n",to_str2);// abcd

void test(char *argv[]){
    char buff[50]={};
    strcat(buff,argv);
    strcat(buff," world");
    printf("%s\n",buff); // hello world
}
char *c="hello";
test(c);

// поиск первого вхождения строки А в строку В без учета регистра символов
// char *strcasestr (const char *strB, const char *strA);
char str_source[50] = "hello woRLD";
char str_search[10]="rld";
char *str_point2 = strcasestr(str_source,str_search);
printf("%s",str_point2);// RLD

// поиск первого вхождения символа в строку
// char *strchr (const char *str, int ch);
char str_source2[50] = "hello woRLD";
char s_search='R';
char *str_point3 = strchr(str_source2,s_search);
if (str_point3!=NULL)
    printf("%s",str_point3);// RLD

// сравнение строк
// int strcmp (const char *str1, const char *str2);
char str_source3[50] = "hello woRLD";
char str_source4[50] = "hello woRLD";
if (strcmp (str_source3, str_source4)==0)
      puts ("Строки идентичны");
   else
      puts ("Строки отличаются");

//  формирование сообщения об ошибке по коду ошибки.
// char *strerror (int errcode);
printf (“Ошибка 99: %s\n“, strerror (99) );// Ошибка 99: Cannot assign requested address

// разбиение строки на части по указанному разделителю
    char str [24]= "test1/test2/test3/test4";
   // Набор символов, которые должны входить в искомый сегмент
   char sep [10]="/";
   // Переменная, в которую будут заноситься начальные адреса частей
   // строки str
   char *istr;
  istr = strtok (str,sep);

   // Выделение последующих частей
   while (istr != NULL)
   {
      // Вывод очередной выделенной части
      printf ("%s\n",istr);
      // Выделение очередной части строки
      istr = strtok (NULL,sep);
   }

    return EXIT_SUCCESS;
}
```

