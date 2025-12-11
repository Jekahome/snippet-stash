

**Файл config.lua**:

```lua
-- Конфигурационный Lua-файл
config = {
    window = {
        width = 800,
        height = 600,
        fullscreen = false
    },
    player = {
        name = "Alice",
        lives = 3
    }
}

-- Можно добавить вычисляемое значение
function window_area()
    return config.window.width * config.window.height
end

```

**Файл main.c**:
```c

#include <stdio.h>
#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>
 
/*
Скрипты и конфиги на Lua можно менять на лету, и программа на C будет реагировать
на изменения без перекомпиляции

C-программа читает Lua-конфиг, использует его значения, и потом можно просто поменять 
Lua-файл — программа снова прочтёт новые значения.
*/
void main(void){

    lua_State *L = luaL_newstate();    // создаём Lua-состояние
    luaL_openlibs(L);                  // подключаем стандартные библиотеки

    // Загружаем Lua-файл
    if (luaL_dofile(L, "config.lua") != LUA_OK) {
        printf("Error loading config: %s\n", lua_tostring(L, -1));
        lua_close(L);
        return 1;
    }

    // Достаем таблицу config
    lua_getglobal(L, "config"); // помещаем в стек
    if (!lua_istable(L, -1)) {
        printf("config is not a table!\n");
        lua_close(L);
        return 1;
    }

    // Достаем window.width
    lua_getfield(L, -1, "window"); // config.window
    lua_getfield(L, -1, "width");  // config.window.width
    int width = (int)lua_tointeger(L, -1);
    lua_pop(L, 1);

    // Достаем window.height
    lua_getfield(L, -1, "height");
    int height = (int)lua_tointeger(L, -1);
    lua_pop(L, 1);

    // Достаем fullscreen
    lua_getfield(L, -1, "fullscreen");
    int fullscreen = lua_toboolean(L, -1);
    lua_pop(L, 2); // pop window и fullscreen

    printf("Window: %dx%d, fullscreen: %s\n",
           width, height, fullscreen ? "yes" : "no");

    // Вызов функции window_area()
    lua_getglobal(L, "window_area");
    if (lua_isfunction(L, -1)) {
        if (lua_pcall(L, 0, 1, 0) == LUA_OK) {
            int area = (int)lua_tointeger(L, -1);
            printf("Window area: %d\n", area);
            lua_pop(L, 1);
        } else {
            printf("Error calling window_area(): %s\n", lua_tostring(L, -1));
        }
    }

    lua_close(L);
    return 0;
}
```

Компиляция:
```
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always \
-fmessage-length=0 -Wformat-diag \
-I/usr/include/lua5.4 -O0 main.c -o my_program.out -llua5.4 -lm -ldl
```


