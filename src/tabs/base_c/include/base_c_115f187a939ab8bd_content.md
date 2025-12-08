

**Файл prog.exe:**

```

#include <stdio.h>
#include <locale.h> // для русского языка
#include <unistd.h>  // для sleep
#include <stdlib.h> // EXIT_SUCCESS, EXIT_FAILURE

const unsigned char NUMBER = 2;// константа

// Обьявлние прототипа ф-ции, компилятор должен знать о ф-ции до ее использования
void show(char *name,int *arr,int size);
int add(int val,int inc);

void test(char *argv[]){
     printf("%s\n",argv[0]);// fw
     printf("%s\n",*++argv);// w  передвинуть указатель в массиве вперед 
}

int main(int argc, char *argv[], char *env[]){
    // /prog.exe file1 file2 file3
    // argc = 4
    // argv[0] - это указатель на строку /prog.exe, argv[1] - на строку file1 и т.д
     setlocale(LC_ALL, "Rus"); // для русского языка
    
     int arr_init[5] = {0, 1, 2, 3, 4};
     char *name = "Gosha";
     show(name,arr_init,5);
     
     // указатель на функцию
     int (*f_point)();
     f_point = add;// имя функции (без скобок и аргументов) это указатель на нее
     int result = f_point(2,4);
     printf("result:%d\n",result);
      
      // char *argv[] - массив (неопределенного размера) указателей на char
      char l = 'f';
      char *p=&l;
      char l2 = 'w';
      char *p2=&l2;
      char *arr_p[2]={p,p2};
      
      test(arr_p);

      sleep(1); // 1 сек
    return EXIT_SUCCESS;
}

void show(char *name,int *arr,int size){
    printf("%s\n",name);
    
    for(int i=0;i<size;i++){
         printf("%d %d",arr[i],add(i,5));
    }
}

int add(int val,int inc){
     return val+inc;
}

```

Запуск:

`/prog.exe file1 file2 file3`

