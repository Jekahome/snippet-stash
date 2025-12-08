

```

#include <stdio.h>  // для printf, fprintf, fopen, fclose
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE, exit
#include <errno.h> // perror

int main(void){  
   FILE *fp=NULL;// указатель на обьект имеющий доступ к файлу
     
   // Открытие файла
   fp=fopen("test.txt","wx");

   // Проверка открытия файла
   if (fp == NULL) {
      printf ("Не удалось открыть файл\n");
      exit(EXIT_FAILURE);
   }
 
   //Запись данных в файл--------------------------------------------------------
   fprintf(fp,"Тест записи в файл");

    char name[] = "Иван";
    int age = 25;
    double salary = 50000.50;
    
    // Запись форматированных данных---------------------------------------
    fprintf(fp, "Имя: %s\n", name);
    fprintf(fp, "Возраст: %d\n", age);
    fprintf(fp, "Зарплата: %.2f\n", salary);

    // Запись строк----------------------------------------------------------------------
    char *lines[] = {"Первая строка", "Вторая строка", "Третья строка"};
    int count = sizeof(lines) / sizeof(lines[0]);
    for (int i = 0; i < count; i++) {
        fputs(lines[i], fp);
        fputc('\n', fp);  // Добавляем символ новой строки
    }

    // Чтение построчно----------------------------------------------------------------
    char buffer[256];
    while (fgets(buffer, sizeof(buffer), fp) != NULL) {
        // Убираем символ новой строки
        buffer[strcspn(buffer, "\n")] = '\0';
        printf("Прочитана строка: %s\n", buffer);
    }
    if (feof(fp)) {
        printf("Достигнут конец файла - всё нормально\n");
    }
    if (ferror(fp)) {
        perror("Произошла ошибка чтения"); 
    }

   // Закрытие файла-------------------------------------------------------------------
   fclose (fp);
   printf ("Файл закрыт\n");
   return EXIT_SUCCESS;
} 

```
