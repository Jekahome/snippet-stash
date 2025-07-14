# Поддержка pulldown-cmark для рендеринга Markdown
Так как `mdbook` использует [`crate pulldown-cmark`](https://docs.rs/pulldown-cmark/0.10.0/pulldown_cmark/) с поддержкой строгой реализация `CommonMark` и при редактировании markdown на клиенте нужно следовать такой-же логике парсинга как при сборке html из markdown на сервере. 

Поэтому клиентские парсеры markdown такие как `marked` и `markdown-it` не подходят со своей реализацией `CommonMark`


## Build

```
# dependency
cargo install wasm-pack

wasm-pack build --target web

```

На выходе получается папка `pkg` c файлами `md_wasm.js` и `md_wasm_bg.wasm`, которые следует переместить в `src/js/md_wasm.js` и `src/js/md_wasm_bg.wasm`  

## Use

```
<script type="module">
  import init, { render_markdown } from "./pkg/md_wasm.js";
  async function run() {
    await init();

    window.convert = () => {
      const result_html = render_markdown(markdown);
    };
  }
  run();
</script>
```