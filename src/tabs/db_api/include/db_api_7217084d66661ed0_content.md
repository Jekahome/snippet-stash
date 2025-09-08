

SQLx — позволяет делать проверки времени компиляции. 
crate SQLx обеспечивает довольно хорошие проверки для наших запросов, если мы используем только эту функцию.

Проверенным запросом является запрос, который может быть статически проверен во время компиляции. SQLx сравнивает имена столбцов и таблиц со схемой базы данных, проверяет синтаксис и типы данных без запуска какого-либо кода.

Непроверенный запрос не имеет никаких гарантий вообще. Он может содержать любое количество опечаток и проблем с типами, и компилятор не может их отловить.

Как правило, запросы, созданные с использованием функций `sqlx::query()` и `sqlx::query_as()`, не проверяются, а созданные с использованием макросов `sqlx::query!` и `sqlx::query_as!` (и нескольких других) проверяются. Если вы видите, что используется QueryBuilder, этот запрос не проверяется. 
 
<pre><code class="language-rust">
fn main(){
// Postgres version
let ids = sqlx::query_as!(
    Uuid,
    "SELECT id FROM users \
     WHERE ($1::timestamptz IS NULL OR updated_at < $1) \
       AND ($2::timestamptz IS NULL OR updated_at > $2) \
       AND ($3::boolean IS NULL OR is_guest = $3)",
    updated_before_option,
    updated_after_option,
    is_guest_option,
    )
    .fetch_all(&pool)
    .await;

let records = sqlx::query!("SELECT name, email, created_at \
    FROM users WHERE id = ANY($1)",
    ids,
    )
    .fetch_all(&pool)
    .await;

}
</code></pre>
