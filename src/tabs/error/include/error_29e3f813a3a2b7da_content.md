

<pre><code class="language-rust">
use my_library::*;
mod my_library{
    use std::io::Read;
    use super::*;

    #[derive(thiserror::Error, Debug)]
    pub enum SumFileError {
        #[error(transparent)]
        Io(#[from] std::io::Error),
        #[error("Path: {0}, I/O error: {1}")]
        IoMetadata(std::path::PathBuf, #[source] io::Error),
        #[error(transparent)]
        Parse(#[from] std::num::ParseIntError),
        #[error("sum file error: {0}")]
        ZeroSum(ZeroSumKind),
        #[error("sum file error: {0}")]
        CustomSum(String),
    } 

    #[derive(thiserror::Error, Debug)]
    #[error("ZeroSumKind is here!")]
    pub struct ZeroSumKind;

    pub fn sum_file(path: &std::path::Path) -> std::result::Result<i32, SumFileError> {
        let mut file = std::fs::File::open(path)?; // std::io::Error -> SumFileError
        let mut contents = String::new();
        file.read_to_string(&mut contents)?; //  std::io::Error -> SumFileError
        let mut sum = 0;
        for line in contents.lines() {
            sum += line.parse::<i32>().map_err(|e|{e})?; //  std::num::ParseIntError -> SumFileError
        }
        if sum == 0{
            return Err(SumFileError::ZeroSum(ZeroSumKind).into());// явное создание внутренненр типа ошибки
        }
        if sum == 5{
            return Err(SumFileError::CustomSum("Value must not be 5".to_owned()).into());// явное создание внутренненр типа ошибки
        }
        Ok(sum)
    }
}
fn main() {
    let res:std::result::Result<i32,SumFileError> = sum_file(std::path::Path::new("src/main.rs"));
     match res{
        Err(SumFileError::Io(e)) => {println!("{:?}",e);},
        Err(SumFileError::Parse(e)) => {
            println!("{:?}",e);// ParseIntError { kind: InvalidDigit }
            let kind:&std::num::IntErrorKind = e.kind();
            println!("{:?}",kind);// InvalidDigit
        },
        Err(SumFileError::ZeroSum(e)) => {println!("{:?}",e);},
        Err(SumFileError::CustomSum(e)) => {println!("{:?}",e);},
        Ok(_)=>{}
    };  
   
    // From/Into
    match "...".parse::<i32>(){
        Err(parse_err) => {
            let _err:SumFileError = parse_err.clone().into();
            let _err: SumFileError = SumFileError::Parse(parse_err.clone());
            let err: SumFileError = SumFileError::from(parse_err);
             // Display 
            println!("{}",err);// invalid digit found in string
        },
        _ =>{}
   }
   // Display 
   let err:SumFileError = SumFileError::ZeroSum(ZeroSumKind);
   println!("{}",err);// sum file error: ZeroSumKind is here!
 }  
</code></pre>
