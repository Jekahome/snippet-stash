

```c

// Упаковка RGB цвета в 16 бит (5-6-5)
unsigned short pack_rgb565(int r, int g, int b) {
    return ((r & 0x1F) << 11) | ((g & 0x3F) << 5) | (b & 0x1F);
}

// Извлечение компонентов
int get_red(unsigned short color) {
    return getbits(color, 15, 5);  // Биты 15-11
}

```
