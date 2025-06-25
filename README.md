

[mdBook doc](https://docs.rs/mdbook/latest/mdbook/preprocess/struct.CmdPreprocessor.html)

### [Сборка книги](https://rust-lang.github.io/mdBook/cli/build.html)

```

mdbook clean
mdbook build

mdbook --version
    mdbook v0.4.44

cargo install mdbook --force

mdbook --version
    mdbook v0.4.51
```


### Просмотр

Чтобы увидеть изменения в реальном времени при редактировании книги, используйте команду [serve](https://rust-lang.github.io/mdBook/cli/serve.html)

Запустить сервер и открыть в браузере:

```
mdbook serve --open
```

Запустить сервер:

```
mdbook serve

или

mdbook serve --hostname 127.0.0.1 --port 3001
```


[mdBook Markdown](https://rust-lang.github.io/mdBook/format/markdown.html)





# Как смотреть контент приватно

#### 1. хорошо, а как на счет имени сайта т.е. его URL я же могу вместо имени ввести какой-то хеш который буду знать только я - proj-a7f9c3b1e8d2-docs-for-review-z5x4y3

Да! Это отличная и очень практичная идея. Вы подошли к самому популярному методу "безопасности через неясность" (security through obscurity).

Этот метод гораздо эффективнее, чем JS-пароль или куки, и широко используется в реальном мире (например, в Google Docs, когда вы создаете "ссылку для доступа").

#### 2. Самое продвинутое, что можно сделать для защиты контента на GitHub Pages, — это клиентское шифрование (client-side encryption).

Этот подход фундаментально отличается от всех, что мы обсуждали. Вместо того чтобы пытаться спрятать доступ к файлу, вы выкладываете файл на всеобщее обозрение, но в полностью зашифрованном, нечитаемом виде. Расшифровать его можно только в браузере пользователя, если он введет правильный пароль.

Вам понадобится JavaScript-библиотека для шифрования, например, CryptoJS.

 

#### 3. Чтобы сайт был доступен онлайн, но только вам (или по паролю): Используйте Netlify или Vercel, подключив к ним свой приватный репозиторий на GitHub


Существуют другие сервисы (конкуренты GitHub Pages), которые позволяют бесплатно размещать сайты из ваших приватных репозиториев GitHub, при этом сохраняя их приватность.

Самые популярные и удобные — Netlify и Vercel.

Как это работает на примере Netlify:

1. Регистрация: Зарегистрируйтесь на Netlify с помощью вашего аккаунта GitHub. Это бесплатно.

2. Создание сайта: Нажмите "Add new site" -> "Import an existing project".

3. Подключение репозитория: Выберите GitHub и дайте Netlify доступ к вашим репозиториям. Вы сможете выбрать нужный приватный репозиторий.

4. Настройка: Обычно Netlify сам определяет все настройки. Просто нажмите "Deploy site".

5. Ограничение доступа: После публикации сайта зайдите в его настройки на Netlify (Site settings -> Access control) и установите пароль на сайт (Password protection).

Теперь ваш сайт будет размещен в интернете по ссылке, но чтобы его увидеть, нужно будет ввести пароль, который знаете только вы.





# Новая версия для подсветки [highlight.js doc](https://highlightjs.readthedocs.io/en/latest/api.html#configure)

[highlight.js doc](https://www.jsdelivr.com/package/npm/highlight.js)

https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js

```
hljs.versionString

    '11.9.0'
```




# Подключение файла Markdown

## Preprocessor mdbook-tera

```
cargo install mdbook-tera


[preprocessor.tera]
command = "mdbook-tera"
renderers = ["html"]

```

<div>
{% include "file.tera" %}
</div>

## Preprocessor mdbook-mermaid

cargo install mdbook-mermaid

[preprocessor.mermaid]
command = "mdbook-mermaid"

<div>
{{#include "file.md"}}
</div> 

## Свой собственный Preprocessor

В папке preprocessors. Весь контент анализируется на наличие ключевого шаблона и заменятся вставкой из файла

[mdbook examples](https://github.com/rust-lang/mdBook/blob/master/examples/remove-emphasis/mdbook-remove-emphasis/src/main.rs)

# [Icons](https://gist.github.com/rxaviers/7360908)

💾 :floppy_disk:


