

Например имя "__job" следует соглашению стандарта `ANSI С` о том, что все закрытые имена  реализации, видимые снаружи, должны начинаться с двух знаков подчеркивания. Это снижает вероятность конфликта имен.
 

**Имена функций**
* Понятные префиксы: `vec_`, `str_`, `list_` — чтобы ясно было, к какой «модели» относится функция.

```
void read_file(void);
int get_value_from_sensor(void);

```


**Локальные переменные**

```
int count;
char *buffer;
float temperature_celsius;

```


**Глобальные переменные** (принято давать префикс модуля или `_g_`):

```
int g_counter;
char g_device_name[32];

```

**Константы и макросы**

```
#define MAX_BUFFER_SIZE 256
#define PI 3.1415926
const int max_clients = 10;

```


**Типы и структуры** (часто пишут в PascalCase (с заглавной буквы)):

```
typedef struct {
    int x;
    int y;
} Point;

typedef enum {
    STATE_INIT,
    STATE_READY,
    STATE_ERROR
} SystemState;

typedef struct sensor_data_t {
    int temperature;
    int pressure;
} sensor_data_t;

```


**Префиксы и неймспейсы**

Так как в C нет пространств имён, принято добавлять префиксы для модулей:

```
// file: motor.c
void motor_init(void);
void motor_start(void);
void motor_stop(void);

// file: adc.c
void adc_init(void);
int  adc_read(void);

```
