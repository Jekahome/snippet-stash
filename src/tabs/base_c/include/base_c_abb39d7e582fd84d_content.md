

```

// test_utils.c
#include "unity/unity.h"
#include "../utils.h"   
#include <stdint.h>
#include <string.h>
#include <math.h>

void setUp(void) {
    // Вызывается перед каждым тестом
}

void tearDown(void) {
    // Вызывается после каждого теста
}

void test_add_positive(void) {
    TEST_ASSERT_EQUAL(8, add(5, 3));
}
 
void test_add_failed(void) {
    TEST_ASSERT_NOT_EQUAL(9, add(5, 3));
}

void test_multiply_positive(void) {
    TEST_ASSERT_EQUAL(4, multiply(2,2));
}

void test_multiply_failed(void) {
    TEST_ASSERT_NOT_EQUAL(5, multiply(2,2));
} 
 
// -----------------------------------------------
/*
**Boolean**
- `TEST_ASSERT(condition)`
- `TEST_ASSERT_TRUE(condition)`
- `TEST_ASSERT_UNLESS(condition)`
- `TEST_ASSERT_FALSE(condition)`
- `TEST_ASSERT_NULL(pointer)`
- `TEST_ASSERT_NOT_NULL(pointer)`
*/
void test_unity_boolean(void) {
    TEST_ASSERT(1 == 1);
    TEST_ASSERT_TRUE(1 > 0);
    TEST_ASSERT_UNLESS(1 == 0);
    TEST_ASSERT_FALSE(0);

    int *ptr = NULL;
    TEST_ASSERT_NULL(ptr);

    int x = 1;
    ptr = &x;
    TEST_ASSERT_NOT_NULL(ptr);
} 

/*
**Signed and Unsigned Integers (of all sizes)**
- `TEST_ASSERT_EQUAL_INT(exp, act)`
- `TEST_ASSERT_EQUAL_INT8(exp, act)`
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
*/
void test_unity_signed_unsigned_integers_sizes(void) {
    {
        int x = 1;
        int y = 1;
        TEST_ASSERT_EQUAL_INT(x, y);    
        TEST_ASSERT_EQUAL(x, y);   
        TEST_ASSERT_NOT_EQUAL(x,  0);       
    }

    {
        int8_t x = 0;
        int8_t y = 0;

        TEST_ASSERT_EQUAL_INT(x, y);    
         
    }
    {
        int16_t x = 0;
        int16_t y = 0;

        TEST_ASSERT_EQUAL_INT16(x, y);         
    }
    {
        uint8_t x = 1;
        uint8_t y = 1;

        TEST_ASSERT_EQUAL_UINT(x, y);  
    }
}

/*
**Unsigned Integers (of all sizes) in Hexadecimal**
- `TEST_ASSERT_EQUAL_HEX(exp, act)`
- `TEST_ASSERT_EQUAL_HEX8(exp, act)`
- `TEST_ASSERT_EQUAL_HEX16(exp, act)`
- `TEST_ASSERT_EQUAL_HEX32(exp, act)`
- `TEST_ASSERT_EQUAL_HEX64(exp, act)`
*/
void test_unity_hexadecimal(void) {
    uint16_t reg = 0xA55A;
    TEST_ASSERT_EQUAL_HEX16(0xA55A, reg);
}

/*
**Masked and Bit-level Comparisons**
- `TEST_ASSERT_BITS(mask, exp, act)`
- `TEST_ASSERT_BITS_HIGH(mask, act)`
- `TEST_ASSERT_BITS_LOW(mask, act)`
- `TEST_ASSERT_BIT_HIGH(bit, act)`
- `TEST_ASSERT_BIT_LOW(bit, act)`
*/
void test_unity_bit_level(void) {
    /*{
        // Проверяет, что актуальное значение содержит тот же набор битов под маской, что и exp
        // (exp & mask) == (act & mask)
        #define ENABLE 0x01
        #define ERROR  0x04
        uint8_t mask = ENABLE | ERROR;

        uint8_t exp = ENABLE;    // ENABLE=1, ERROR=0
        uint8_t act = 0b00000101; // ENABLE=1, ERROR=1 (!) error bit mismatch

        TEST_ASSERT_BITS(mask, exp, act);// FAIL: Expected XXXXXXXXXXXXXXXXXXXXXXXXXXXXX0X1 Was XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1X1
    }*/

    //---------------------------------------------------------
    // проверяет, что все биты, указанные в маске как 1, в ac должны быть - HIGH
    // Биты 2 и 3 — должны быть HIGH → тест пройдет
    TEST_ASSERT_BITS_HIGH(0b00001100, 0b11111100);

    //---------------------------------------------------------
    // проверяет, что все биты, указанные в маске как 1, в ac должны быть - LOW
    // Биты 2 и 3 — оба LOW → тест пройдет
    TEST_ASSERT_BITS_LOW(0b00001100, 0b10110011);

    //---------------------------------------------------------
    // проверяет, что конкретный бит в числе = HIGH
    // bit — это номер бита, а не маска.
    int act = 0b00000100;
    //  Бит №2 → 1 → тест проходит.
    TEST_ASSERT_BIT_HIGH(2, act);

    //---------------------------------------------------------
    // проверяет, что конкретный бит в числе = LOW
    // Бит №5 → 0 → тест проходит.
    TEST_ASSERT_BIT_LOW(5, 0b00000000);
}

/*
**Integer Ranges (of all sizes)**
- `TEST_ASSERT_INT_WITHIN(delta, exp, act)`
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
*/
void test_unity_ranges(void) {
    // проверяют попадание значения в диапазон
    // (exp - delta) <= act <= (exp + delta)
    // То есть actual должен быть в пределах exp ± delta
    int expected = 100;
    int actual   = 103;

    TEST_ASSERT_INT_WITHIN(5, expected, actual);
    TEST_ASSERT_HEX_WITHIN(0x10, 0x100, 0x0F5);
    // Тест пройдёт, потому что:
    // 100 - 5 = 95
    // 100 + 5 = 105
    // 103 — внутри диапазона
}

/*
**Structs and Strings**
- `TEST_ASSERT_EQUAL_PTR(exp, act)`
- `TEST_ASSERT_EQUAL_STRING(exp, act)`
- `TEST_ASSERT_EQUAL_MEMORY(exp, act, len)`
*/
void test_unity_structs_and_strings(void) {
    {
        // проверяет что два указателя равны, т.е. указывают на один и тот же адрес
        int a = 5;
        int *p1 = &a;
        int *p2 = &a;

        TEST_ASSERT_EQUAL_PTR(p1, p2);  // OK — указывают на один адре        
    }
    {
        // Сравнивает строки по содержимому, а не по адресам
        // Останавливается на первом '\0' (как strcmp(exp, act) == 0)
        const char *s = "Hello";
        TEST_ASSERT_EQUAL_STRING("Hello", s);

    }
    {
        // Побайтово сравнивает память (memcmp)
        // В отличие от TEST_ASSERT_EQUAL_STRING, этот макрос не смотрит на '\0', а сравнивает ровно len байт
        typedef struct {
            uint8_t a;
            uint16_t b;
            char name[4];
        } Data;

        Data exp = {0};
        exp.a = 1;
        exp.b = 200;
        memcpy(exp.name, "Bob", 4);

        Data act = {0};
        act.a = 1;
        act.b = 200;
        memcpy(act.name, "Bob", 4);
   
        TEST_ASSERT_EQUAL_MEMORY(&exp, &act, sizeof(Data));


    }
    {
        typedef struct {
            uint8_t a;
            uint16_t b;
            char name[4];
        } Data;

        Data exp = {1, 200, "Bob"};
        Data act = {1, 200, "Bob"};
        // Так не проходит тест из-за мусорного padding, который остаётся неинициализированным
        // TEST_ASSERT_EQUAL_MEMORY(&exp, &act, sizeof(Data));// FAIL: Memory Mismatch. Byte 1 Expected  Was
        // можно сранить по полям
        TEST_ASSERT_EQUAL_UINT8(exp.a, act.a);
        TEST_ASSERT_EQUAL_UINT16(exp.b, act.b);
        TEST_ASSERT_EQUAL_STRING(exp.name, act.name);
        // или учесть только реальные поля
        TEST_ASSERT_EQUAL_MEMORY(&exp, &act, sizeof(uint8_t) + sizeof(uint16_t) + (sizeof(char) * 4));  

        
        //---------------------------------------------------------
        // Можно убрать padding и сранить
        #define PACKED _Pragma("pack(push,1)")
        #define PACKED_END _Pragma("pack(pop)")

        PACKED 
        typedef struct {
            uint8_t a;
            uint16_t b;
            char name[4];
        } Data_NoPadding;
        PACKED_END

        TEST_ASSERT_EQUAL(8, sizeof(Data));
        TEST_ASSERT_EQUAL(7, sizeof(Data_NoPadding));

        Data_NoPadding exp_np = {1, 200, "Bob"};
        Data_NoPadding act_np = {1, 200, "Bob"};
        TEST_ASSERT_EQUAL_MEMORY(&exp_np, &act_np, sizeof(Data));
    }
    {
        uint8_t exp[3] = {1, 2, 3};
        uint8_t act[3] = {1, 2, 3};
        TEST_ASSERT_EQUAL_MEMORY(exp, act, 3);
    }
}

/*
**Arrays**
- `TEST_ASSERT_EQUAL_INT_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT8_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT16_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT32_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_INT64_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT8_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT16_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT32_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_UINT64_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX8_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX16_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX32_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_HEX64_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_PTR_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_STRING_ARRAY(exp, act, elem)`
- `TEST_ASSERT_EQUAL_MEMORY_ARRAY(exp, act, len, elem)`
*/
void test_unity_arrays(void) {
    {
        // Сравнивает elem первых элементов двух массивов int
        int exp[] = {1, 2, 3};
        int act[] = {1, 2, 3};

        TEST_ASSERT_EQUAL_INT_ARRAY(exp, act, 3);
    }
    {
        // Сравнивает elem первых элементов двух массивов HEX
        uint16_t exp[] = {0x10, 0x20};
        uint16_t act[] = {0x10, 0x20};

        TEST_ASSERT_EQUAL_HEX_ARRAY(exp, act, 2);
    }
    {
        // Сравнивает массивы указателей. Сравнивает сами адреса, не содержимое по ним.
        int a = 5, b = 7;
        int *exp[] = { &a, &b };
        int *act[] = { &a, &b };

        TEST_ASSERT_EQUAL_PTR_ARRAY(exp, act, 2);
    }
    {
        // Сравнивает массив строк (char* или char[…][…]). strcmp для каждого элемента
        const char *exp[] = {"Bob", "Alice"};
        const char *act[] = {"Bob", "Alice"};

        TEST_ASSERT_EQUAL_STRING_ARRAY(exp, act, 2);
    }
    {
        // сравнивает массив произвольных блоков данных
        // Сравнивает каждый элемент как сырые байты
        // Если в структуре есть padding — сравнение может упасть

        typedef struct {
            uint8_t a;
            uint8_t b;
        } Item;

        Item exp[] = {{1,2}, {3,4}};
        Item act[] = {{1,2}, {3,4}};

        TEST_ASSERT_EQUAL_MEMORY_ARRAY(exp, act, sizeof(Item), 2);
    }
    {
        // массовая проверка, которая проверяет, что каждый элемент массива равен одному и тому же значению exp
        uint8_t act[] = {5, 5, 5, 5};

        TEST_ASSERT_EACH_EQUAL_INT8(5, act, sizeof(act));// весь массив заполнен значением 5

    }
}    

/*
**Floating Point (If Enabled)**
- `TEST_ASSERT_FLOAT_WITHIN(delta, exp, act)`
- `TEST_ASSERT_EQUAL_FLOAT(exp, act)`
- `TEST_ASSERT_EQUAL_FLOAT_ARRAY(exp, act, elem)`
- `TEST_ASSERT_FLOAT_IS_INF(act)`
- `TEST_ASSERT_FLOAT_IS_NEG_INF(act)`
- `TEST_ASSERT_FLOAT_IS_NAN(act)`
- `TEST_ASSERT_FLOAT_IS_DETERMINATE(act)`
- `TEST_ASSERT_FLOAT_IS_NOT_INF(act)`
- `TEST_ASSERT_FLOAT_IS_NOT_NEG_INF(act)`
- `TEST_ASSERT_FLOAT_IS_NOT_NAN(act)`
- `TEST_ASSERT_FLOAT_IS_NOT_DETERMINATE(act)`
*/
void test_unity_floating_point(void) {
    {
        // Проверяет, что act находится в диапазоне exp ± delta
        // В float почти никогда не стоит проверять точное равенство, поэтому это самый важный макрос.
        float result = 3.1415f;
        TEST_ASSERT_FLOAT_WITHIN(0.01f, 3.14f, result); 

        // Проверяет точное равенство float
        // Используется редко, только если значения точно совпадают (например, константы)
        TEST_ASSERT_EQUAL_FLOAT(3.1415f, result);        
    }
    {
        // Проверяет, что float = NaN (Not a Number)
        float z = 0.0f / 0.0f;   // NaN
        TEST_ASSERT_FLOAT_IS_NAN(z); // OK

        float w = 0.0f / 0.0f;   // NaN
        TEST_ASSERT_FLOAT_IS_NAN(w); // OK        
    }
    {
        // Проверяет, что float не NaN и не Inf
        float a = 3.14f;
        TEST_ASSERT_FLOAT_IS_DETERMINATE(a); // OK

        //float b = 1.0f / 0.0f; 
        // TEST_ASSERT_FLOAT_IS_DETERMINATE(b); // FAIL, т.к. +Inf
    }
    {
        // Проверяет, что значение не равно +∞ (положительная бесконечность)
        float x = 123.4f;
        TEST_ASSERT_FLOAT_IS_NOT_INF(x); // OK

        //float y = 1.0f / 0.0f;           // +Inf
        // TEST_ASSERT_FLOAT_IS_NOT_INF(y); // FAIL    
    }
    {
        // Проверяет, что значение не равно -∞ (отрицательная бесконечность)
        float x = -50.0f;
        TEST_ASSERT_FLOAT_IS_NOT_NEG_INF(x); // OK

        //float y = -1.0f / 0.0f;             // -Inf
        // TEST_ASSERT_FLOAT_IS_NOT_NEG_INF(y); // FAIL
    }
    {
        // Проверяет, что значение не является NaN
        float a = 3.14f;
        TEST_ASSERT_FLOAT_IS_NOT_NAN(a); // OK

        //float b = 0.0f / 0.0f;           // NaN
        // TEST_ASSERT_FLOAT_IS_NOT_NAN(b); // FAIL
    }
}    


//------------------------------------------------
/*
make test
gcc -std=c99 -Wall -Wextra -Wformat -Werror -Wconversion -Wformat=2 -Wformat-security -fdiagnostics-color=always -fmessage-length=0 -Wformat-diag -O0 utils.c tests/test_utils.c tests/unity/unity.c -o test_my_program.out
./test_my_program.out
tests/test_utils.c:430:test_add_positive:PASS
tests/test_utils.c:431:test_add_failed:PASS
tests/test_utils.c:432:test_multiply_positive:PASS
tests/test_utils.c:433:test_multiply_failed:PASS
tests/test_utils.c:435:test_unity_boolean:PASS
tests/test_utils.c:436:test_unity_signed_unsigned_integers_sizes:PASS
tests/test_utils.c:437:test_unity_hexadecimal:PASS
tests/test_utils.c:438:test_unity_bit_level:PASS
tests/test_utils.c:439:test_unity_ranges:PASS
tests/test_utils.c:440:test_unity_structs_and_strings:PASS
tests/test_utils.c:441:test_unity_arrays:PASS
tests/test_utils.c:442:test_unity_floating_point:PASS

-----------------------
12 Tests 0 Failures 0 Ignored 
OK
*/
int main(void) {
    UNITY_BEGIN();
    RUN_TEST(test_add_positive);
    RUN_TEST(test_add_failed);
    RUN_TEST(test_multiply_positive);
    RUN_TEST(test_multiply_failed);

    RUN_TEST(test_unity_boolean);
    RUN_TEST(test_unity_signed_unsigned_integers_sizes);
    RUN_TEST(test_unity_hexadecimal);
    RUN_TEST(test_unity_bit_level);
    RUN_TEST(test_unity_ranges);
    RUN_TEST(test_unity_structs_and_strings);
    RUN_TEST(test_unity_arrays);
    RUN_TEST(test_unity_floating_point);

    return UNITY_END();
}

```
