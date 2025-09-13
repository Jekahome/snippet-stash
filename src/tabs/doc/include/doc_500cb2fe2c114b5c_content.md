

**Автогенерация документации API**
```
use utoipa::OpenApi;

#[derive(OpenApi)]
#[openapi(
    paths(get_user, create_user),
    components(schemas(User, Error)),
    tags(
        (name = "users", description = "User management API")
    )
)]
struct ApiDoc;

// Документация генерируется автоматически!
// Доступна по /api-doc или /swagger-ui
```

**Валидация запросов и ответов**
```
#[utoipa::path(
    get,
    path = "/users/{id}",
    responses(
        (status = 200, description = "User found", body = User),
        (status = 404, description = "User not found", body = Error)
    ),
    params(
        ("id" = i32, Path, description = "User database id")
    )
)]
async fn get_user(id: i32) -> Result<Json<User>, Error> {
    // Swagger проверяет соответствие схеме
}
```

---

**Пример с Actix-web**

File Cargo.toml:
```toml
[dependencies]
utoipa = { version = "3.0", features = ["actix_ext"] }
utoipa-swagger-ui = { version = "3.0", features = ["actix-web"] }
```

```
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

#[derive(OpenApi)]
#[openapi(info(title = "My API", version = "1.0.0"))]
struct ApiDoc;

async fn main() {
    HttpServer::new(|| {
        App::new()
            .service(web::scope("/api").configure(configure_api))
            .service(
                SwaggerUi::new("/swagger-ui/{_:.*}")
                    .url("/api-doc/openapi.json", ApiDoc::openapi())
            )
    })
}
```
