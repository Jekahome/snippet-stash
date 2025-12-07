

Что переключает ioctl:

**1. Режим ввода/вывода**

```c
// Блокирующий vs неблокирующий режим
int nonblock = 1;
ioctl(fd, FIONBIO, &nonblock);  // Переключаем в НЕБЛОКИРУЮЩИЙ режим

int nonblock = 0; 
ioctl(fd, FIONBIO, &nonblock);  // Переключаем в БЛОКИРУЮЩИЙ режим
```

**2. Режим терминала**

```c
struct termios t;
tcgetattr(fd, &t);

// Канонический vs неканонический режим
t.c_lflag &= ~ICANON;  // ВКЛЮЧАЕМ неканонический режим (символы сразу)
// или
t.c_lflag |= ICANON;   // ВКЛЮЧАЕМ канонический режим (ждать Enter)

tcsetattr(fd, TCSANOW, &t);
```

---

```
#include <stdio.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <termios.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <string.h>
#include <errno.h>

// 1. IOCTL для ТЕРМИНАЛА
void terminal_examples() {
    printf("=== ТЕРМИНАЛ ===\n");
    
    int fd = STDIN_FILENO; // Файловый дескриптор stdin
    
    // а) Получить размер терминала
    struct winsize ws;
    if (ioctl(fd, TIOCGWINSZ, &ws) == 0) {
        printf("Размер терминала: %d строк x %d столбцов\n", 
               ws.ws_row, ws.ws_col);
    }
    
    // б) Получить количество байт в буфере ввода
    int bytes_available;
    if (ioctl(fd, FIONREAD, &bytes_available) == 0) {
        printf("Байт в буфере ввода: %d\n", bytes_available);
    }
    
    // в) Установить неблокирующий режим
    int nonblock = 1;
    if (ioctl(fd, FIONBIO, &nonblock) == 0) {
        printf("Неблокирующий режим установлен\n");
    }
}

// 2. IOCTL для СОКЕТОВ
void socket_examples() {
    printf("\n=== СОКЕТЫ ===\n");
    
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("socket");
        return;
    }
    
    // а) Получить количество байт доступных для чтения
    int bytes_available;
    if (ioctl(sockfd, FIONREAD, &bytes_available) == 0) {
        printf("Байт доступно для чтения из сокета: %d\n", bytes_available);
    }
    
    // б) Установить неблокирующий режим сокета
    int nonblock = 1;
    if (ioctl(sockfd, FIONBIO, &nonblock) == 0) {
        printf("Сокет в неблокирующем режиме\n");
    }
    
    // в) Получить размер буфера отправки
    int send_buffer_size;
    socklen_t len = sizeof(send_buffer_size);
    if (ioctl(sockfd, TIOCOUTQ, &send_buffer_size) == 0) {
        printf("Размер буфера отправки: %d байт\n", send_buffer_size);
    }
    
    close(sockfd);
}

// 3. Практический пример: неблокирующий ввод с терминала
void nonblocking_input() {
    printf("\n=== НЕБЛОКИРУЮЩИЙ ВВОД ===\n");
    printf("Нажимайте клавиши (q для выхода)...\n");
    
    int fd = STDIN_FILENO;
    
    // Сохраняем оригинальные настройки
    struct termios original, new;
    tcgetattr(fd, &original);
    new = original;
    
    // Настраиваем raw режим
    new.c_lflag &= ~(ICANON | ECHO);
    new.c_cc[VMIN] = 0;  // Минимум 0 символов - неблокирующий
    new.c_cc[VTIME] = 0; // Таймаут 0
    tcsetattr(fd, TCSANOW, &new);
    
    // Устанавливаем неблокирующий режим через ioctl
    int nonblock = 1;
    ioctl(fd, FIONBIO, &nonblock);
    
    int c;
    int count = 0;
    while (count < 10) { // 10 итераций для демонстрации
        // Проверяем есть ли данные для чтения
        int bytes_available;
        ioctl(fd, FIONREAD, &bytes_available);
        
        if (bytes_available > 0) {
            c = getchar();
            if (c == 'q') {
                printf("\nВыход по клавише 'q'\n");
                break;
            }
            printf("Нажата клавиша: '%c' (код: %d)\n", c, c);
        } else {
            printf(".");
            fflush(stdout);
            usleep(100000); // 100ms
        }
        count++;
    }
    
    // Восстанавливаем настройки терминала
    tcsetattr(fd, TCSANOW, &original);
}

// 4. Пример с сокетом: проверка данных перед чтением
void socket_buffer_check() {
    printf("\n=== ПРОВЕРКА БУФЕРА СОКЕТА ===\n");
    
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    if (sockfd < 0) {
        perror("socket");
        return;
    }
    
    // Устанавливаем неблокирующий режим
    int nonblock = 1;
    ioctl(sockfd, FIONBIO, &nonblock);
    
    // Подключаемся к примерному серверу (закомментировано для демо)
    /*
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_port = htons(80),
        .sin_addr.s_addr = inet_addr("93.184.216.34") // example.com
    };
    
    if (connect(sockfd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        if (errno != EINPROGRESS) {
            perror("connect");
            close(sockfd);
            return;
        }
    }
    */
    
    // Проверяем буфер в цикле
    for (int i = 0; i < 5; i++) {
        int bytes_available;
        if (ioctl(sockfd, FIONREAD, &bytes_available) == 0) {
            if (bytes_available > 0) {
                printf("Доступно для чтения: %d байт\n", bytes_available);
                // read(sockfd, buffer, bytes_available);
            } else {
                printf("Данных нет, ждем...\n");
            }
        }
        sleep(1);
    }
    
    close(sockfd);
}

int main() {
    terminal_examples();
    socket_examples();
    nonblocking_input();
    socket_buffer_check();
    
    return 0;
}
```

