


<pre><code class="language-rust">
use std::error::Error;
use my_library::*;
mod my_library{
    use std::io::Read;
    #[derive(Debug)]
    pub enum SumFileError {
        Io(std::io::Error),
        Parse(std::num::ParseIntError),
        ZeroSum(ZeroSumKind),
        CustomSum(String), // или назвать General(String)
    } 
   // Также хорошей идеей будет реализоватьFromчерта для всех типов подошибок
   // внедрение From позволяет добиться еще большей краткости, поскольку Оператор вопросительного знака ? 
   // автоматически выполнит все необходимые From преобразования, устраняя необходимость в .map_err()
    impl std::convert::From<std::io::Error> for SumFileError {
        fn from(err: std::io::Error) -> Self {
            SumFileError::Io(err)
        }
    }
    impl std::convert::From<std::num::ParseIntError> for SumFileError {
        fn from(err: std::num::ParseIntError) -> Self {
            SumFileError::Parse(err)
        }
    }
    impl std::fmt::Display for SumFileError {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            match self {
                SumFileError::Io(err) => write!(f, "{}", err),
                SumFileError::Parse(err) => write!(f, "{}", err),
                SumFileError::ZeroSum(err) => write!(f, "sum file error: {}", err),
                SumFileError::CustomSum(err) => write!(f, "sum file error: {}", err),
            }
        }
    }
    #[derive(Debug)]
    pub struct ZeroSumKind;
    impl std::error::Error for ZeroSumKind {}
    impl std::fmt::Display for ZeroSumKind {
        fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
            write!(f, "ZeroSumKind is here!")
        }
    }
    // Также имеет смысл переопределить source()реализацию по умолчанию для легкого доступа к вложенным ошибкам:
    impl std::error::Error for SumFileError {
        fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
            match self {
                SumFileError::Io(err) => Some(err),
                SumFileError::Parse(err) => Some(err),
                SumFileError::ZeroSum(err) => Some(err),
                SumFileError::CustomSum(err) => None,
            }
        }
    }
    pub fn sum_file(path: &std::path::Path) -> std::result::Result<i32, SumFileError> {
        let mut file = std::fs::File::open(path)?; // std::io::Error -> SumFileError
        let mut contents = String::new();
        file.read_to_string(&mut contents)?; // std::io::Error -> SumFileError
        let mut sum = 0;
        for line in contents.lines() {
            sum += line.parse::<i32>()?; // std::num::ParseIntError -> SumFileError
        }
        if sum == 0{
            return Err(SumFileError::ZeroSum(ZeroSumKind));// явное создание внутренненр типа ошибки
        }
        if sum == 5{
            return Err(SumFileError::CustomSum("Value must not be 5".to_owned()));// явное создание внутренненр типа ошибки
        }
        Ok(sum)
    }
}
fn main() {
    let res:std::result::Result<i32,SumFileError> = sum_file(std::path::Path::new("src/main.rs"));
    match res{
        Err(SumFileError::Io(e)) => {println!("{:?}",e);},
        Err(SumFileError::Parse(e)) => {println!("{:?}",e);},
        Err(SumFileError::ZeroSum(e)) => {println!("{:?}",e);},
        Err(SumFileError::CustomSum(e)) => {println!("{:?}",e);},
        Ok(_)=>{}
    };    
    let res:std::result::Result<i32,SumFileError> = sum_file(std::path::Path::new("src/main.rs"));
    match res{
        Err(e) => {
            println!("{:?} msg:{}",e,e.to_string());
             
            if let Some(e) = e.source().unwrap().downcast_ref::<std::num::ParseIntError>(){// use std::error::Error
                let kind:&std::num::IntErrorKind = e.kind();// std::num::IntErrorKind::InvalidDigit
                println!("{:?}",kind);
            }
        },
        _ =>{}
    }
   // From/Into
   match "...".parse::<i32>(){
        Err(parse_err) => {
            let err: SumFileError = SumFileError::Parse(parse_err.clone());
            let err: SumFileError = parse_err.clone().into();
            let err: SumFileError = SumFileError::from(parse_err);
            // Display 
            println!("{}",err);// invalid digit found in string
        },
        _ =>{}
   }
   let err:SumFileError = SumFileError::ZeroSum(ZeroSumKind);
   println!("{}",err);// sum file error: ZeroSumKind is here!
}

</code></pre>
