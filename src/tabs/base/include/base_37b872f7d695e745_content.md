

Мотивация этих черт заключается в том, что искажение типа - это огромная боль в шее, и для функции очень приятно просто волшебным образом понять это для вас. 
В частности, если функция ожидает путь к файлу, у нас есть все эти опции:
```
impl AsRef<Path> for Path
impl AsRef<Path> for OsStr
impl AsRef<Path> for OsString
impl AsRef<Path> for str
impl AsRef<Path> for String
impl AsRef<Path> for PathBuf
```

Все они «просто работают», так что вы можете:
```
std::fs::File::open("hello.txt") // &str
std::fs::File::open(format!("hello-{}.txt", num)) и т. д.  // String
```
До насильственного принуждения люди были очень расстроены из-за необходимости проходить везде `foo.as_slice()` 

