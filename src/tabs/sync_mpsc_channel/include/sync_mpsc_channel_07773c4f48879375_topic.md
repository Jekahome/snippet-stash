

[std::sync::mpsc::**sync_channel**](https://doc.rust-lang.org/std/sync/mpsc/fn.sync_channel.html)() - Создает новый синхронный ограниченный канал.

Struct [std::sync::mpsc::**SyncSender**](https://doc.rust-lang.org/std/sync/mpsc/struct.SyncSender.html) - С ограниченными (синхронными) каналами send можно заблокировать текущий поток

**send**() - Отправляет значение по этому синхронному каналу, блокирует пока не освободится буфер или получит Receiver

**try_send**() - Пытается отправить значение по этому каналу без блокировки, сбой если буфер канала заполнен или ни один получатель не ожидает






