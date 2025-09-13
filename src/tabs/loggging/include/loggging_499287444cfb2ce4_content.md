

* **error!**: Критические ошибки, приложение не может продолжать работу. (для серьезных проблем)
* **warn!**: Предупреждения, что-то пошло не так, но работа может продолжаться. (для неожиданных, но некритичных событий)
* **info!**: Важная информация о ходе выполнения. ( для важных шагов процесса)
* **debug!**: Детальная информация для отладки. (для входных/выходных данных функций)
* **trace!**: Очень подробная информация, вход/выход из функций. (для пошагового выполнения)
```
pub async fn call_api(url: &str) -> Result<Response> {
    info!("Calling external API: {}", url);
    let response = reqwest::get(url).await?;
    
    let status = response.status();
    debug!("API response status: {}", status);
    
    if !status.is_success() {
        warn!("API call failed: {}", status);
    } else {
        trace!("API response headers: {:?}", response.headers());
    }
    Ok(response)
}
```
