

 
 
lua_State *L = **luaL_newstate**(); - Создаёт новое Lua-состояние (аналог “виртуальной машины” Lua).  

**lua_close(L);**  - Закрывает Lua-состояние, освобождает память.                   

Пример:

```c
lua_State *L = luaL_newstate();
luaL_openlibs(L);  // подключаем стандартные библиотеки
lua_close(L);
```
