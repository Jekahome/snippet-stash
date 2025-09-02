


<pre><code class="language-rust">
#[macro_export]
macro_rules! safe_eject {
    ($e:expr, $err_status:expr) => {
        $e.map_err(|x| NanoServiceError::new(
            x.to_string(),
            $err_status)
        )
    };
    ($e:expr, $err_status:expr, $message_context:expr) => {
        $e.map_err(|x| NanoServiceError::new(
                format!("{}: {}", $message_context, x.to_string()),
                $err_status
            )
        )
    };
}
use error2::{NanoServiceError, NanoServiceErrorStatus};
pub mod error2{
    use std::fmt;
    use thiserror::Error;
    use serde::{Deserialize, Serialize};

    #[derive(Serialize, Deserialize, Debug, Error)]
    pub struct NanoServiceError {
        pub message: String,
        pub status: NanoServiceErrorStatus
    }
    #[derive(Error, Debug, Serialize, Deserialize, PartialEq)]
    pub enum NanoServiceErrorStatus {
        #[error("Requested resource was not found")]
        NotFound,
        #[error("You are forbidden to access requested resource.")]
        Forbidden,
        #[error("Unknown Internal Error")]
        Unknown,
        #[error("Bad Request")]
        BadRequest,
        #[error("Conflict")]
        Conflict,
        #[error("Unauthorized")]
        Unauthorized
    }
    impl NanoServiceError {
        pub fn new(message: String, status: NanoServiceErrorStatus) -> NanoServiceError {
            NanoServiceError { message,status }
        }
    }
    impl fmt::Display for NanoServiceError {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            write!(f, "{}", self.message)
        }
    }
}
// Used:
///
// Для демонстрация ошибки `Error::ReadDir`
// ```
// cargo run -- badrequest
// ```
// Используем макрос для удобного формирования ошибки, с двумя или тремя параметрами
// Вывожим ошибку страндарный поток вывода через Display благодаря преобразованию в anyhow::Result 
fn main() -> anyhow::Result<()> {
    let args: Vec<String> = std::env::args().collect(); 
    if args.len() < 2 {
        return Err(NanoServiceError::new("args are not found".to_owned(), NanoServiceErrorStatus::NotFound).into());
        //return Err(std::io::Error::other("args are not found"));
    }
    let arg = args[1].clone();
     match arg.as_str() {
        "badrequest" =>  {
            let file = safe_eject!(std::fs::OpenOptions::new().open("file_name"), NanoServiceErrorStatus::BadRequest, "add context")?;
            Ok(())
        },
        _ => Err(NanoServiceError::new("unknown type error".to_owned(),NanoServiceErrorStatus::Conflict).into())
    }
}
</code></pre>
