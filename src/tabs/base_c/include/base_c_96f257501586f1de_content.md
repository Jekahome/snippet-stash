

**Аппаратное программирование**

```c

// Чтение регистров устройств
unsigned int status_register = read_hardware_register();

// Проверка битов состояния
if (getbits(status_register, 7, 1)) {  // Бит готовности
    // Устройство готово
}

// Извлечение кода ошибки
int error_code = getbits(status_register, 3, 4);  // Биты 3-0

```

**Сетевые протоколы**

```c

// Разбор IP-пакета
unsigned int ip_header = receive_packet();

// Извлечение версии IP (первые 4 бита)
int ip_version = getbits(ip_header, 31, 4);

// Длина заголовка (биты 4-7)
int header_length = getbits(ip_header, 27, 4) * 4;

```

**Криптография**

```c

// Извлечение частей ключа
unsigned int cryptographic_key = 0xABCD1234;
unsigned int key_part1 = getbits(cryptographic_key, 31, 16);
unsigned int key_part2 = getbits(cryptographic_key, 15, 16);
```

