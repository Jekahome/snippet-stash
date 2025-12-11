


```c

lua_getglobal(L, "my_function"); // кладём функцию на стек
lua_pushinteger(L, 10);          // аргумент
lua_pushinteger(L, 20);          // аргумент
if (lua_pcall(L, 2, 1, 0) != LUA_OK) {
    printf("Error: %s\n", lua_tostring(L, -1));
}
int result = lua_tointeger(L, -1);
lua_pop(L, 1); // убрать результат
```
