

## Testing use Unity

Лёгкий, часто используется в embedded.

[Unity](https://github.com/ThrowTheSwitch/Unity)

[Шпаргалка по утверждениям Unity](https://github.com/ThrowTheSwitch/Unity/blob/master/docs/UnityAssertionsCheatSheetSuitableforPrintingandPossiblyFraming.pdf)

**Скачать Unity**

```
# 1. Clone Unity

git clone https://github.com/ThrowTheSwitch/Unity.git

# 2. Copy file unity.c and unity.h to folder tests

```

**Пример структуры проекта:**

```
project/
 ├─ src/
 │   ├─ add.c
 │   └─ add.h
 └─ tests/
     ├─ test_add.c
     └─ unity/
         ├─ unity.h
         └─ unity.c

```

**Компиляция:**
```
gcc -std=c99 -O0 add.c tests/test_add.c tests/unity/unity.c -o test_project.out
./test_project.out
```

## Функций-утверждений (assertions) Unity
 
### **Basic Fail and Ignore**
- `TEST_FAIL()`
- `TEST_IGNORE()`

### **Boolean**
- `TEST_ASSERT(condition)`
- `TEST_ASSERT_TRUE(condition)`
- `TEST_ASSERT_UNLESS(condition)`
- `TEST_ASSERT_FALSE(condition)`
- `TEST_ASSERT_NULL(pointer)`
- `TEST_ASSERT_NOT_NULL(pointer)`

### **Signed and Unsigned Integers (of all sizes)**
- `TEST_ASSERT_EQUAL_INT(exp, act)` 
- `TEST_ASSERT_EQUAL_INT8(exp, act)` - проверяет равенство двух значений типа int8_t
- `TEST_ASSERT_EQUAL_INT16(exp, act)`
- `TEST_ASSERT_EQUAL_INT32(exp, act)`
- `TEST_ASSERT_EQUAL_INT64(exp, act)`
- `TEST_ASSERT_EQUAL(exp, act)`
- `TEST_ASSERT_NOT_EQUAL(exp, act)`
- `TEST_ASSERT_EQUAL_UINT(exp, act)`
- `TEST_ASSERT_EQUAL_UINT8(exp, act)`
- `TEST_ASSERT_EQUAL_UINT16(exp, act)`
- `TEST_ASSERT_EQUAL_UINT32(exp, act)`
- `TEST_ASSERT_EQUAL_UINT64(exp, act)`

### **Unsigned Integers (of all sizes) in Hexadecimal**
- `TEST_ASSERT_EQUAL_HEX(exp, act)` - удобнее при работе с регистрами
- `TEST_ASSERT_EQUAL_HEX8(exp, act)`
- `TEST_ASSERT_EQUAL_HEX16(exp, act)`
- `TEST_ASSERT_EQUAL_HEX32(exp, act)`
- `TEST_ASSERT_EQUAL_HEX64(exp, act)`

### **Masked and Bit-level Comparisons**
- `TEST_ASSERT_BITS(mask, exp, act)` - проверяет, что актуальное значение содержит тот же набор битов под маской, что и exp
- `TEST_ASSERT_BITS_HIGH(mask, act)` - проверяет, что все биты, указанные в маске как 1, в ac должны быть - HIGH
- `TEST_ASSERT_BITS_LOW(mask, act)` - проверяет, что все биты, указанные в маске как 1, в ac должны быть - LOW
- `TEST_ASSERT_BIT_HIGH(bit, act)` - проверяет, что конкретный бит в числе = HIGH
- `TEST_ASSERT_BIT_LOW(bit, act)` - проверяет, что конкретный бит в числе = LOW

### **Integer Ranges (of all sizes)**
- `TEST_ASSERT_INT_WITHIN(delta, exp, act)` - проверяют попадание значения в диапазон
- `TEST_ASSERT_INT8_WITHIN(delta, exp, act)`
- `TEST_ASSERT_INT16_WITHIN(delta, exp, act)`
- `TEST_ASSERT_INT32_WITHIN(delta, exp, act)`
- `TEST_ASSERT_INT64_WITHIN(delta, exp, act)`
- `TEST_ASSERT_UINT_WITHIN(delta, exp, act)`
- `TEST_ASSERT_UINT8_WITHIN(delta, exp, act)`
- `TEST_ASSERT_UINT16_WITHIN(delta, exp, act)`
- `TEST_ASSERT_UINT32_WITHIN(delta, exp, act)`
- `TEST_ASSERT_UINT64_WITHIN(delta, exp, act)`
- `TEST_ASSERT_HEX_WITHIN(delta, exp, act)`
- `TEST_ASSERT_HEX8_WITHIN(delta, exp, act)`
- `TEST_ASSERT_HEX16_WITHIN(delta, exp, act)`
- `TEST_ASSERT_HEX32_WITHIN(delta, exp, act)`
- `TEST_ASSERT_HEX64_WITHIN(delta, exp, act)`

### **Structs and Strings**
- `TEST_ASSERT_EQUAL_PTR(exp, act)` - проверяет что два указателя равны, т.е. указывают на один и тот же адрес
- `TEST_ASSERT_EQUAL_STRING(exp, act)` - сравнивает строки по содержимому 
- `TEST_ASSERT_EQUAL_MEMORY(exp, act, len)` - побайтово сравнивает память (memcmp). Если в структуре есть padding — сравнение может упасть

### **Arrays**
- `TEST_ASSERT_EQUAL_INT_ARRAY(exp, act, elem)` - сравнивает elem первых элементов двух массивов int
- `TEST_ASSERT_EQUAL_INT8_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT16_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT32_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT64_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT8_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT16_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT32_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT64_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX_ARRAY(exp, act, elem)` - сравнивает elem первых элементов двух массивов HEX
- `TEST_ASSERT_EQUAL_HEX8_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX16_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX32_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX64_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_PTR_ARRAY(exp, act, elem)` - сравнивает массивы указателей. Сравнивает сами адреса, а не содержимое по ним
- `TEST_ASSERT_EQUAL_STRING_ARRAY(exp, act, elem)` -  сравнивает массив строк (char* или char[…][…]). strcmp для каждого элемента
- `TEST_ASSERT_EQUAL_MEMORY_ARRAY(exp, act, len, elem)` - сравнивает массив произвольных блоков данных. Сравнивает каждый элемент как сырые байты. Если в структуре есть padding — сравнение может упасть

### **Each Equal (Comparing Arrays to a Single Value)**
- `TEST_ASSERT_EACH_EQUAL_INT8(exp, act, elem)` - массовая проверка, которая проверяет, что каждый элемент массива равен одному и тому же значению exp

### **Floating Point (If Enabled)**
- `TEST_ASSERT_FLOAT_WITHIN(delta, exp, act)` - проверяет, что act находится в диапазоне exp ± delta
- `TEST_ASSERT_EQUAL_FLOAT(exp, act)` - проверяет точное равенство float
- `TEST_ASSERT_EQUAL_FLOAT_ARRAY(exp, act, elem)`
- `TEST_ASSERT_FLOAT_IS_INF(act)`
- `TEST_ASSERT_FLOAT_IS_NEG_INF(act)`
- `TEST_ASSERT_FLOAT_IS_NAN(act)` - проверяет, что float = NaN (Not a Number)
- `TEST_ASSERT_FLOAT_IS_DETERMINATE(act)` - проверяет, что float не NaN и не Inf
- `TEST_ASSERT_FLOAT_IS_NOT_INF(act)` - проверяет, что значение не равно +∞ (положительная бесконечность)
- `TEST_ASSERT_FLOAT_IS_NOT_NEG_INF(act)` - проверяет, что значение не равно -∞ (отрицательная бесконечность)
- `TEST_ASSERT_FLOAT_IS_NOT_NAN(act)`
- `TEST_ASSERT_FLOAT_IS_NOT_DETERMINATE(act)`

### **Double (If Enabled)**
- `TEST_ASSERT_DOUBLE_WITHIN(delta, exp, act)`
- `TEST_ASSERT_EQUAL_DOUBLE(exp, act)`
- `TEST_ASSERT_EQUAL_DOUBLE_ARRAY(exp, act, elem)`
- `TEST_ASSERT_DOUBLE_IS_INF(act)`
- `TEST_ASSERT_DOUBLE_IS_NEG_INF(act)`
- `TEST_ASSERT_DOUBLE_IS_NAN(act)`
- `TEST_ASSERT_DOUBLE_IS_DETERMINATE(act)`
- `TEST_ASSERT_DOUBLE_IS_NOT_INF(act)`
- `TEST_ASSERT_DOUBLE_IS_NOT_NEG_INF(act)`
- `TEST_ASSERT_DOUBLE_IS_NOT_NAN(act)`
- `TEST_ASSERT_DOUBLE_IS_NOT_DETERMINATE(act)`

---

**Проект Unity — [ThrowTheSwitch.org](http://ThrowTheSwitch.org)**  
Авторы: Mike Karlesky, Mark VanderVoord

