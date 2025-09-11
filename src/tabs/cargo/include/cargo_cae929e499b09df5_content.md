

❌
```
//! Some module.
mod private_stuff;
pub mod public_stuff;
```

--- 

❌
```
use std::sync::{Arc, Mutex};
use chrono::{DateTime, Utc};
use futures::Future as _;
use serde::{Deserialize, Serialize};
use crate::core::{DynFuture, DynStream};
use super::event;
use self::private_stuff::util;
pub use postgres::Type;
pub use crate::core::util::UnfoldingStream;
pub use super::props::Error;
pub use self::public_stuff::*;
```

---

❌
```
use std::sync::{Arc, Mutex};
use chrono::{DateTime, Utc};
use futures::Future as _;
use serde::{Deserialize, Serialize};

use crate::core::{DynFuture, DynStream};
use super::event;
use self::private_stuff::util;

pub use postgres::Type;
pub use crate::core::util::UnfoldingStream;
pub use super::props::Error;
pub use self::public_stuff::*;
```

