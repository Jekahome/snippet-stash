

 
**luaL_dofile**(L, "file.lua") - Загружает и выполняет Lua-файл.                                   

**luaL_loadfile**(L, "file.lua")  - Загружает Lua-файл, но не выполняет. Можно потом вызвать `lua_pcall`. 

**lua_pcall**(L, nargs, nresults, errfunc) - Вызывает Lua-функцию с аргументами на стеке.                          

Пример:

```c
if (luaL_dofile(L, "config.lua") != LUA_OK) {
    printf("Error: %s\n", lua_tostring(L, -1));
}
```
