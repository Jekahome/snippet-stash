

```c

#include <stdio.h>
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE
#include <string.h>

// Декларация типа с дескриптором User и с глобальной переменной global_guest
#define LEN_NAME 60

struct User{
    int age;
    char name[LEN_NAME];
} global_guest, *global_ptr_guest;  

#define AGE 9
#define NAME "Kolya"
struct User global_guest_2 = { AGE, NAME }; // инициализация глобальных и статичных данных только константными выражениеми

// Псевдоним типа через typedef  
typedef struct{
    int age;
    char *name;
} User_2; 

typedef struct{
    struct User *user1;
    User_2 *user2; // Удобное обьявление полей через typedef
} WhoIs;
   
void print_point(const struct User u) {// const запрещает изменять структуру
    printf("%s %d\n", u.name, u.age);
}
void print_point_ptr(const struct User *u) {
    printf("%s %d\n", u->name, u->age);
}
int main(void) {
    char *name = "Kolya";
    int age = 9;
 
   global_guest.age = age;
   //strcpy(global_guest.name, name);
   snprintf(global_guest.name, sizeof( global_guest.name), "%s", name);
   printf("Guest name:%s age:%d",global_guest.name, global_guest.age);
     
   // ститическая переменная
   //static struct User static_guest = {.age=age, .name=name};  // Error, глобальные/статические переменные должны быть инициализированы константными выражениеми это происходит во время компиляции, а не во время выполнения используя переменные пусть даже с ключевым словом const.
   static struct User static_guest = {.age=9, .name="Kolya"}; 
   print_point(static_guest);

   // локальная переменная типа User
   
   struct User local_guest_1 = {};
   local_guest_1.age = age;
   snprintf(local_guest_1.name, sizeof( local_guest_1.name), "%s", name);
   print_point(local_guest_1);

   struct User local_guest_2 = {.age=age, .name="Kolya"};
   print_point(local_guest_2);

   struct User local_guest_3 = {9, "Kolya"};
   print_point(local_guest_3);

   struct User local_guest_4 = local_guest_3; // инициализация структуры другой структурой, происходит полная копия
   print_point(local_guest_4);

   // Указатель локальный
   struct User *local_guest = NULL;
   local_guest = &local_guest_2;
   printf("%s", local_guest->name); // то же самое что (*local_guest).name

   // Указатель глобальный (он уже обьявлен но нуждается в инициализации)
   global_ptr_guest = &local_guest_2;
   // Проверка перед доступом к полям
   if (global_ptr_guest != NULL) {
       printf("%s\n", global_ptr_guest->name);
   } else {
       fprintf(stderr, "Ошибка: указатель не инициализирован!\n");
   }

   // Псевдоним типа позволяет опустить слово struct
   User_2 local_guest_5 = {};
   local_guest_5.age = 9;
   local_guest_5.name = "Kolya";
   printf("%s", local_guest_4.name);

   // Динамически выделить память и освободить ее
   struct User *u = malloc(sizeof(struct User));
   u->age=9;
   snprintf(u->name, sizeof(u->name), "%s", name);
   print_point_ptr(u);
   free(u);

   WhoIs who_is ={.user1=&local_guest_1, .user2=&local_guest_5};
   print_point_ptr(who_is.user1);

   // Вариант для хранения указателя на строку в структуре
   // выделим память через malloc и не забудим освободить память
   User_2 local_guest_6 = {};
   local_guest_6.age = age;
   size_t len = strlen(name) + 1;
   local_guest_6.name = (char *) malloc(len);  
   if (local_guest_6.name == NULL) {
    // обработка ошибки
   }
   //strcpy(local_guest_6.name, name);
   snprintf(local_guest_6.name, len, "%s", name);
   printf("%s", local_guest_6.name);
   free(local_guest_6.name); // освободить heap
   
   return EXIT_SUCCESS;
}

```
