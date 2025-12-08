

```

// Декомпрессия с переменной длиной кодов
unsigned int read_variable_code(unsigned int bitstream, int *position, int length) {
    int code = getbits(bitstream, *position, length);
    *position += length;
    return code;
}

```
