


<pre><code class="language-rust">
use std::error::Error;
use std::fmt::Display;
// ErrorOne.
mod error_one {
    use super::*;
    #[derive(Debug)]
    pub struct ErrorOne;
    impl Display for ErrorOne {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            write!(f, "ErrorOne")
        }
    }
    impl Error for ErrorOne {}
}
use error_one::ErrorOne;

// ErrorTwo.
mod error_two {
    use super::*;
    #[derive(Debug)]
    pub struct ErrorTwo;
    impl Display for ErrorTwo {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            write!(f, "ErrorTwo")
        }
    }
    impl Error for ErrorTwo {}
}
use error_two::ErrorTwo;
</code></pre>
