
# Snipet stash
![Build](https://github.com/jekahome/snippet-stash/actions/workflows/mdbook.yml/badge.svg)

**Snipet stash** - это хранилище кодовых заметок в табличной форме. 

Идея возникла как вариант более удобного использования `Google Sheets`, который имеет структуру таблицы но не имеет подсветки синтаксиса. Вариант с форматом Makrdown (`mdbook`) значительно лучше для форматирования кода, и возможность применения `Javascript` расширяет гибкость пользовательского взаимодействия. 

<details>

<summary>en</summary>

**Snippet Stash** is a code snippet storage system designed to serve as a personal reference or knowledge base.
The idea was born out of the need for proper syntax highlighting (which was missing in Google Sheets) and the advantages provided by `mdBook`.

</details>

## Preview

<details>

<summary>Скриншоты, гифки или диаграммы, которые иллюстрируют интерфейс или архитектуру.</summary>


</details>

Онлайн редактирование HTML контента сохраняется в браузере клиента. При сохранении изменений выполняется запрос на Github через Github API и инициируется CI/CD сборка с запуском скриптов изменения makrdown файлов репозитория и сохранении картинок. Таким образом реализовано добавление новый страниц, ячеек таблиц, добавления картинок.

Для ускорения времени сборки, исполняемый файлы такие как `bin/mdbook`, `bin/editor-md`, `bin/mdbook-include-md` предварительно скомпилированы необходимых версий. 

Удаление ячеек `tr`, страниц `tab` и картинок не поддерживается через WEB

<details>

<summary>en</summary>

This project allows **live editing of HTML content directly in the browser**. Changes are saved locally, and when saved explicitly, a GitHub API request is triggered. This initiates a CI/CD pipeline that runs scripts to update Markdown files and image assets in the repository. This enables:

* Adding new pages
* Inserting new table rows (`<tr>`)
* Uploading and embedding images

To improve build performance, all executable tools (`bin/mdbook`, `bin/editor-md`, `bin/mdbook-include-md`) are precompiled in required versions and reused across builds.

> ⚠️ **Note:** Deletion of table rows (`<tr>`), pages (`tab`), or images is not supported via the web interface.
</details>


## Features

- Подсветка синтаксиса кода
- Выполнение кода на языке Rust, Python
- Makrdown форматирование заметок 
- Поиск по заметкам
- Статический сайт
- Новые разделы `tab` создаются после редактирования структуры в файле `src/SUMMARY.md`


<details>

<summary>en</summary>

* Syntax highlighting for code snippets
* Code execution support (Rust and Python)
* Markdown-based note formatting
* Full-text search across notes
* Static website generation with `mdBook`
* New `tab` sections are created after editing the structure in the `src/SUMMARY.md` file
</details>

### Оформление кода
- Оформление кода в HTML 

```html
<pre><code class="language-python"> 
def print_person(name, age = 18):
    print(f"Name: {name}  Age: {age}")
print_person("Bob")
</code></pre>
```

- Оформление кода в Markdown 

```code
line break
line break
```rust
fn main() {
    println!("Hello, world!");
}
line break
```

## Установка

- Склонировать и удалить содержимое папок `src/tabs`, `src/images` (кроме default picture `src/images/coming-soon.gif`).
- В файле `book.toml` поменять `site-url`.
- В файле `src/js/global.js` поменять констаты репозитория.
- Создать [personal-access-tokens](https://github.com/settings/personal-access-tokens/new) к своему репозиторию
- Выполнить `make` либо создать в репозитории `GitHub Page`

---
## Resources

[mdBook doc](https://docs.rs/mdbook/latest/mdbook/preprocess/struct.CmdPreprocessor.html)

[mdBook Preprocessors](https://github.com/rust-lang/mdBook/wiki/Third-party-plugins)

[zola альтернатива mdBook](https://www.getzola.org/documentation/getting-started/overview/) 

[build mdBook](https://rust-lang.github.io/mdBook/cli/build.html)
 
[mdBook Markdown](https://rust-lang.github.io/mdBook/format/markdown.html)

[highlight.js doc](https://highlightjs.readthedocs.io/en/latest/api.html#configure)


