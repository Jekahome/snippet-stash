

```
enum PacketType {
    Data  = 0, // packet carries a data payload
    Fin   = 1, // signals the end of a connection
    State = 2, // signals acknowledgment of a packet
    Reset = 3, // forcibly terminates a connection
    Syn   = 4, // initiates a new connection with a peer
}
```

---

Учитывая это представление, как нам преобразовать в байтовое представление и обратно?
Если бы мы следовали обычному стилю Rust и не присваивали вариантам никаких значений, числовое представление каждого варианта зависело бы от порядка их объявления, что может привести к ошибкам, если мы просто преобразуем варианты перечисления в числовые типы.
```
impl From<PacketType> for u8 {
    fn from(original: PacketType) -> u8 {
        match original {
            PacketType::Data  => 0,
            PacketType::Fin   => 1,
            PacketType::State => 2,
            PacketType::Reset => 3,
            PacketType::Syn   => 4,
        }
    }
}
```

---

Обратное преобразование из u8 в enum PacketType не верно, не для всех u8 есть аналог в enum PacketType
Нам нужен способ сообщить, что преобразование не удалось, но вызов panic!() не является приемлемым вариантом. 
```
impl TryFrom<u8> for PacketType {
    type Err = ParseError;
    fn try_from(original: u8) -> Result<Self, Self::Err> {
        match original {
            0 => Ok(PacketType::Data),
            1 => Ok(PacketType::Fin),
            2 => Ok(PacketType::State),
            3 => Ok(PacketType::Reset),
            4 => Ok(PacketType::Syn),
            n => Err(ParseError::InvalidPacketType(n))
        }
    }
}
```
