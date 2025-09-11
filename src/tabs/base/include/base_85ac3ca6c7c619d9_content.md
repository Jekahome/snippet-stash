

```rust
use safety_guard::safety;
use derive_more::{Display, FromStr};
/// Type of [`User`]'s unique number.
///
/// This type has no zero value. And it's values are always in range between
/// `1_000_000_000_000` and `9_999_999_999_999` inclusively.
#[derive(Debug)]
pub struct UserNum(u64);

/// Minimum allowed value of [`UserNum`].
pub const MIN_USER_NUM: u64 = 1_000_000_000_000;

/// Maximum allowed value of [`UserNum`].
pub const MAX_USER_NUM: u64 = 9_999_999_999_999;

impl UserNum {
    /// Creates new [`UserNum`] from given `u64` value if it meats [`UserNum`]
    /// invariants.
    #[inline]
    pub fn new(num: u64) -> Option<Self> {
        if Self::validate(num) {
            Some(Self(num))
        } else {
            None
        }
    }

    /// Creates new [`UserNum`] from given `u64` value without performing
    /// any validation.
    ///
    /// # Performance
    ///
    /// This function is especially useful when constructing [`UserNum`]
    /// values from some trusted source (like already validated numbers
    /// stored in database) as doesn't make any checks which are undesired
    /// in such context.
    #[inline]
    #[safety(
    assert(Self::validate(num)),
    "`num` must be in range [[`MIN_USER_NUM`], [`MAX_USER_NUM`]]"
    )]
    pub unsafe fn new_unchecked(num: u64) -> Self {
        Self(num)
    }

    /// Validates given `u64` to be a valid [`UserNum`].
    #[inline]
    pub fn validate(num: u64) -> bool {
        num >= MIN_USER_NUM && num <= MAX_USER_NUM
    }
}
impl From<UserNum> for u64 {
    #[inline]
    fn from(num: UserNum) -> Self {
        num.0
    }
}

impl str::FromStr for UserNum {
    type Err = UserNumParseError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let n = s.parse::<u64>().map_err(UserNumParseError::NotNumber)?;
        UserNum::new(n).ok_or_else(|| UserNumParseError::OutOfRange)
    }
}

/// Error of parsing [`UserNum`] from string.
#[derive(Debug, Display, Fail)]
pub enum UserNumParseError {
    /// String cannot be parsed as `u64` number.
    #[display(fmt = "Not a u64 number: {}", _0)]
    NotNumber(#[fail(cause)] std::num::ParseIntError),

    /// Number is not in the range required by [`UserNum`].
    #[display(
    fmt = "Number is not in range [{}, {}]",
    MIN_USER_NUM,
    MAX_USER_NUM
    )]
    OutOfRange,
}
fn main(){}
```
