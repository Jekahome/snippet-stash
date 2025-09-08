


<pre><code class="language-rust no_run edition2024">
type PgPool = deadpool_r2d2::Pool<deadpool_postgres::Manager>;

struct WsMessage(String)

impl Handler<WsMessage> for MyWebSocket {
    type Result = ();

    fn handle(&mut self, msg: WsMessage, ctx: &mut Context<Self>) -> Self::Result {
        ctx.text(msg.0);
    }
}

pub struct MyWebSocket {
    db: deadpool::managed::Object<deadpool_postgres::Manager>    
}

impl MyWebSocket {
    pub fn new(client_db: deadpool::managed::Object<deadpool_postgres::Manager>) -> Self {
        Self { db:client_db }
    }
}

impl Actor for MyWebSocket {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for MyWebSocket {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
         Ok(ws::Message::Text(text)) => {
            // Отправить ответ в обработчике WsMessage
              let db = self.db.clone();
              let addr = ctx.addess();
              let fut = async move {
                let stmt = db.prepare_cached("SELECT 1 + $1").await.unwrap();
                let rows = db.query(&stmt, &[&3]).await.unwrap();
                let value: i32 = rows[0].get(0);
                addr.send(WsMessage(String::from(value))).await.unwrap();
             };
             let fut = actix::fut::wrap_future::<_, Self>(fut);
             ctx.spawn(fut);

            ИЛИ
            // Отправить ответ сразу используя  ActorFuture
             let db = self.db.clone();

             let fut = async move {
                let stmt = db.prepare_cached("SELECT 1 + $1").await.unwrap();
                let rows = db.query(&stmt, &[&3]).await.unwrap();
                let value: i32 = rows[0].get(0);
                value
             };
             let fut = actix::fut::wrap_future::<_, Self>(fut);
             let fut = fut.map(|result, actor, ctx| {
                 ctx.text(result.to_string());
             });
            ctx.spawn(fut)

         },
         ....
        }
    }
}
fn create_pool(max_size: usize) -> PgPool {
    let config:tokio_postgres::Config = config().expect("Error configure");
    let mgr_config = ManagerConfig {
        recycling_method: RecyclingMethod::Fast
    };
    let mgr:deadpool_postgres::Manager = Manager::from_config(config, NoTls, mgr_config);
    let pool:deadpool_r2d2::Pool<deadpool_postgres::Manager> = 
        Pool::builder(mgr).runtime(deadpool_postgres::Runtime::Tokio1).max_size(max_size).build().unwrap();
    pool
} 

#[get("ws/")]
async fn ws_index(req: HttpRequest, stream: web::Payload,db_pool: web::Data<PgPool>) -> Result<HttpResponse, Error> {
    let client:deadpool::managed::Object<deadpool_postgres::Manager> = db_pool.get().await.unwrap();
    let resp = ws::start(MyWebSocket::new(client), &req, stream);
    resp
}

#[actix_web::main]
async fn main() -> std::io::Result<()> { 
    let pool:PgPool = create_pool(2);
    HttpServer::new(move|| {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap( middleware::DefaultHeaders::new().header("Access-Control-Allow-Origin", "*"))
            .service(ws_index)
            .wrap(middleware::Logger::default())
    })
    .workers(2)
    .bind(("0.0.0.0", 4011))?
    .run()
    .await
}
</code></pre>
