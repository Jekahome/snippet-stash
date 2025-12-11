

**lua_getglobal**(L, "var") -  Кладёт глобальную переменную Lua `var` на стек.                              

**lua_setglobal**(L, "var") - Берёт значение со стека и сохраняет его как глобальную переменную Lua `var`. 

Пример:

```c

lua_getglobal(L, "config"); // кладём таблицу config на стек
lua_setglobal(L, "config_copy"); // сохраняем её как другую глобальную переменную
```
