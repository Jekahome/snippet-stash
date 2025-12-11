


**lua_istable**(L, index) - Проверяет, является ли значение на стеке таблицей.             

**lua_getfield**(L, index, "key") - Берёт из таблицы поле `key` и кладёт на стек.                 

**lua_setfield**(L, index, "key") - Берёт значение со стека и помещает в таблицу под ключом `key`. 

Пример:

```c

lua_getglobal(L, "config"); // config
lua_getfield(L, -1, "window"); // config.window
lua_getfield(L, -1, "width");  // config.window.width
int width = (int)lua_tointeger(L, -1);
lua_pop(L, 1); // убрать width
```
