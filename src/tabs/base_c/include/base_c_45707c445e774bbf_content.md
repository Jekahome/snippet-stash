

* time_t time(time_t *tloc) — возвращает текущее время в секундах с 1 января 1970 года. Если tloc не NULL, записывает туда результат.
* clock_t clock(void) — возвращает процессорное время, затраченное программой, в тактах процессора.
* double difftime(time_t time1, time_t time0) — разница между двумя time_t в секундах (time1 - time0).
* struct tm *localtime(const time_t *timep) — преобразует time_t в локальное календарное время (struct tm).
* struct tm *gmtime(const time_t *timep) — преобразует time_t в UTC (GMT) календарное время.
* time_t mktime(struct tm *timeptr) — преобразует struct tm в time_t (обратная операция localtime/gmtime).
* char *asctime(const struct tm *timeptr) — преобразует struct tm в читаемую строку "Wed Jun 30 21:49:08 1993\n".
* char *ctime(const time_t *timep) — преобразует time_t в строку, эквивалент asctime(localtime(timep)).
* size_t strftime(char *s, size_t max, const char *format, const struct tm *tm) — форматирует struct tm в строку по шаблону.
* void tzset(void) — устанавливает глобальные переменные timezone и daylight на основе текущей TZ среды.
* int clock_getres(clockid_t clk_id, struct timespec *res) — (POSIX) определяет разрешение часов.
* int clock_gettime(clockid_t clk_id, struct timespec *tp) — (POSIX) возвращает текущее время указанного clock.
* int clock_settime(clockid_t clk_id, const struct timespec *tp) — (POSIX) задает текущее время указанного clock.
* struct tm *localtime_r(const time_t *timep, struct tm *result) — потокобезопасная версия localtime.
* struct tm *gmtime_r(const time_t *timep, struct tm *result) — потокобезопасная версия gmtime.
