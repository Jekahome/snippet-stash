


Способ 3.

Отдельная компиляция + динамическая линковка

**1. Компилируем динамическую библиотеку**

utils.c — это файл с функциями, которые мы хотим вынести в библиотеку.

```
# компилируем объектный файл для динамической библиотеки с флагом -fPIC (позиционно-независимый код)
gcc -c -fPIC utils.c -o utils.o

# создаем динамическую библиотеку libutils.so
gcc -shared -o libutils.so utils.o

# -shared говорит компилятору сделать .so
# -fPIC — чтобы код был позиционно-независимым (обязательно для динамических библиотек)
```

**2. Компилируем исполняемый файл**

Теперь main.c будет ссылаться на функции из этой библиотеки:

```
# компилируем main.c в объектным файлом
gcc -c main.c -o main.o

# линковка с динамической библиотекой libutils.so
gcc main.o -L. -lutils -o my_program.out

# -L. — искать библиотеки в текущей директории
# -lutils — подключаем libutils.so (имя без префикса lib и суффикса .so)
```

**3. Запуск программы**
```
dynamic_linking/my_program.out: error while loading shared libraries: libutils.so: cannot open shared object file: No such file or directory
```

Linux должен знать, где находится .so. Есть несколько способов:
* Указать переменную окружения LD_LIBRARY_PATH:
```
export LD_LIBRARY_PATH=/home/jeka/Projects/C/HelloWorld/dynamic_linking:$LD_LIBRARY_PATH
./my_program.out
```

* Или задать путь при линковке (rpath):
```
gcc main.o -L/home/jeka/Projects/C/HelloWorld/dynamic_linking -lutils -Wl,-rpath=/home/jeka/Projects/C/HelloWorld/dynamic_linking -o my_program.out
```
Теперь .so будет искаться в текущей директории.

* Или скопировать libutils.so в системные каталоги типа /usr/lib или /usr/local/lib и обновить кэш ldconfig

**4. Теперь можно менять utils.c и пересобрать только библиотеку libutils.so:**
Повторяем шаг 1
```
# компилируем объектный файл для динамической библиотеки с флагом -fPIC (позиционно-независимый код)
gcc -c -fPIC utils.c -o utils.o

# создаем динамическую библиотеку libutils.so
gcc -shared -o libutils.so utils.o
```
