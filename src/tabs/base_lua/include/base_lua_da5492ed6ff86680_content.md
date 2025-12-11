

**Файл script.lua**:

```lua
-- однострочный
--[[
многострочный комментарии
]]

-- глобальные переменный (по умолчанию)
x = 10        -- число
x = "hello"   -- теперь строка

 
local a = 1 -- локальная
local b = 2
if a > b then
    print("a > b")
else
    print("a <= b")
end


-- Функции

function add(a, b)
    return a + b
end

local f = function(x) return x * 2 end

-- Цикл while
local i = 0
while i < 10 do
    i = i + 1
end

-- Цикл for
i = nil  -- удаляет значение переменной (эквивалент NULL)
i = 0
for i = 1, 10 do
    print(i)
end

--[[
Lua не имеет массивов и структур как в C — есть таблицы, которые могут быть:
- массивом
- словарём
- объектом
- чем угодно одновременно

Индексация начинается с 1
]]

t = {10, 20, 30}   -- массив
person = {name="Bob", age=20}   -- словарь
print(t[1]) -- 10

-- Строки — иммутабельные
local s = "hello"
print(#s)        -- длина строки
print(s .. " world") -- конкатенация
```

**Файл main.c**:

```c
#include <stdio.h>
#include <lua.h>
#include <lauxlib.h>
#include <lualib.h>
 
int main() {
    lua_State *L = luaL_newstate();   // создаём Lua-состояние
    luaL_openlibs(L);                 // подключаем стандартные библиотеки Lua

    if (luaL_dofile(L, "script.lua") != LUA_OK) { // выполняем скрипт Lua
        printf("Error: %s\n", lua_tostring(L, -1));
    }

    lua_close(L); // закрываем Lua
  
    return 0;
}

```

Компиляция:
```
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always \
-fmessage-length=0 -Wformat-diag \
-I/usr/include/lua5.4 -O0 main.c -o my_program.out -llua5.4 -lm -ldl
```



