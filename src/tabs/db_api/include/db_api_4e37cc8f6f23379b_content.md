

Cargo.toml:
```toml
[package]
....
default-run = "main"

[[bin]]
name = "main"
path = "src/main.rs"

[[bin]]
name = "migrations"
path = "src/migrations.rs"
```

Запуск миграции:
`$  cargo run --bin migrations`



File src/migrations.rs:
<pre><code class="language-rust">

use tokio_postgres::{NoTls, Error,Client,Connection};
use refinery::config::Config;

mod embedded {
    use refinery::embed_migrations;
    embed_migrations!("migrations");// Dir migrations
}

#[tokio::main] // По умолчанию tokio_postgres использует crate tokio в качестве runtime (среды выполнения).
async fn main() -> std::result::Result<(), tokio_postgres::Error> {
    // Connect to the database.
    // "postgres://rust:job_queue@localhost:5432/rust"
    let (mut client, connection):(Client,Connection<_,_>) =
            tokio_postgres::connect("host=localhost user=rust port=5432 password='job_queue'  dbname=rust", NoTls).await?;

    // Объект подключения выполняет фактическую связь с базой данных, поэтому запускает его самостоятельно.
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("connection error: {}", e);
        }
    });
   
    run_migrations(&mut client).await.expect("can run DB migrations: {}");
    Ok(())
}

// type Error = Box<dyn std::error::Error + Send + Sync + 'static>;
async fn run_migrations(client:&mut Client) -> std::result::Result<(), refinery::Error> {
    println!("Running DB migrations...");
     
    // let migration_report:Result<refinery::Report,  refinery::Error> = embedded::migrations::runner().run_async(client).await?;
    match embedded::migrations::runner().run_async(client).await {
        Ok(migration_report) => {
            for migration in migration_report.applied_migrations() {
                println!("Migration Applied - Name: {}, Version: {}", migration.name(), migration.version());
            }
        },
        Err(err) => {
            use std::error::Error;
            // refinery::Error
            if let Some(err) = err.source().map(|source| source.downcast_ref::<refinery::Error>())
            {
               // handle err
            }else{
                println!("Show error: {:?}",err);
            }
        }
    }
    println!("DB migrations finished!");
    Ok(())
}

async fn drop_migrations_table(client:&mut Client) -> std::result::Result<(), tokio_postgres::Error> {
    client.execute("DROP TABLE refinery_schema_history", &[]).await?;
    Ok(())
}
</code></pre>

---

File migrations/V1__initial.sql
 
```sql
CREATE TABLE IF NOT EXISTS todo
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255),
    created_at timestamp with time zone DEFAULT (now() at time zone 'utc'),
    checked boolean DEFAULT false
);
```

File migrations/V2__add_checked_date.sql
```sql
ALTER TABLE todo
    ADD COLUMN checked_date timestamp with time zone;
```

File migrations/V3__init.sql
```sql
CREATE TABLE IF NOT EXISTS queues (
  id UUID PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL,

  scheduled_for TIMESTAMP WITH TIME ZONE NOT NULL,
  failed_attempts INT NOT NULL,
  status INT NOT NULL,
  message JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS index_queue_on_scheduled_for ON queues (scheduled_for);
CREATE INDEX IF NOT EXISTS index_queue_on_status ON queues (status);
```












