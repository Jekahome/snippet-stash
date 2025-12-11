

**Name mangling (искажение имен)**

Это касается C++ в котором есть возможность использовать перегрузку, когда имена функций одинаковые. Тогда компоновщик применяет искажение имен функций и что бы их увидеть используют инструмент **nm**

```cpp

ns1::add(int,int) -> __ZN3ns13addEii
ns1::add(long,long) -> __ZN3ns13addExx

```

```
 
nm ffi-lib.o | grep add  # what the linker sees for C

     0000000000000000 T _add

nm ffi-cpp-lib.o | grep add  # what the linker sees for C++

     0000000000000000 T __ZN3ns13addEii

nm ffi-cpp-lib.o | grep add | c++filt  # use c++filt

     0000000000000000 T ns1::add(int, int)
```

Rust FFI с C: используем extern "C" + #[no_mangle] → символы без mangling, linker просто соединяет, типы не проверяет.

То есть когда используешь Rust с C через FFI, важно следить, чтобы сигнатуры совпадали, иначе компоновщик пропустит ошибку, а краш будет уже во время работы.
