

```
use std::process::Termination;
/*
Реализации трейта Termination:
- ()
- std::result::Result<T, E> where T: Termination, E: Debug
- ! - (представляет собой тип вычислений, которые никогда не приводят к какому-либо значению.)
- std::convert::Infallible - (Тип ошибки для ошибок, которые никогда не могут произойти.)
- std::process::ExitCode
 
 классифицирует тест как пройденный или не пройденный в зависимости от того, ExitCode соответствует ли результат успешному завершению.
*/

// cargo test -p adder
#[cfg(test)]
 mod test{
    #[test]
    fn success1()->(){
        // return ()
        // default
        assert_eq!(1,1);
    }
    #[test]
    fn success2() -> std::result::Result<(),std::io::Error>{
        // return Result
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(std::io::Error::new(std::io::ErrorKind::Other, "two plus two does not equal four"))
        }
    }
    #[test]
    fn success3() -> std::process::ExitCode{
        // return ExitCode 
        assert_eq!(1,1);
        std::process::ExitCode::SUCCESS
    }
    #[test]
    fn success4(){
        // return ! 
        assert_eq!(1,1);
        std::process::exit(0x0100)
    }
}

// Оптимизированная сборка не будет выполнять debug_assert! операторы, если они `-C debug-assertions` не переданы компилятору. 
// Это debug_assert! полезно для проверок, которые слишком дороги для присутствия в сборке выпуска, но могут быть полезны во время разработки.

fn blabla(){
   let x = true;
   debug_assert!(x, "x wasn't true!");
}
```
