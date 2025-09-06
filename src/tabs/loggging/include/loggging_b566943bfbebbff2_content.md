

Мониторинг OS Servera:

```sh
apt-get install munin munin-node
service munin-node start
ps ax | grep muni
```

Теперь munin-node будет собирать метрики системы и писать их в бд, а munin раз в 5 минут будет генерировать из этой бд html-отчёты и класть их в папку `/var/cache/munin/www`

Если у Вас установлен apache2, то при установки munin к его настройкам автоматически добавится конфиг файл виртуалхоста для доступа к мониторингу. Web интерфейс будет доступен по адресу http://localhost/munin и только с локального компьютера. 
