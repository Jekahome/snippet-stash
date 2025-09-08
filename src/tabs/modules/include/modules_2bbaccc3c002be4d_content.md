

1. **std импорты**
2. **импорты внешних крейтов**
3. **внутренни crate:: импорты**
4. **super:: импорты**
5. **self:: импорты**
 
**Пример:**
<pre><code class="language-rust">
use std::num;

use diesel::prelude::*;
use tokio::fs;

use crate::{
    api::{UserLogin, UserQuery, UserReturn, UserReturnLogin, UserUpdate},
    db::{Conn, Result},
}

use super::super:: {
    orm::{error::ServiceError, schema, BaseDiesel, UserLoginType, UserType},
    BaseDb, ConnectType, QueryStore, Store, TokenType,
}

use self::submod::Something;

fn main(){
 ...
}
</code></pre>

Внутри одной секции, и внутри каждой строки элементы должны идти в алфавитном порядке.



