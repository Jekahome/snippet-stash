

Создавайте диаграммы зависимостей для ваших проектов 

```
cargo install cargo-deps
sudo apt install graphviz

cargo deps | dot -Tpng > graph.png

cargo deps --all-deps | dot -Tpng > graph.png
```

---

```
cargo install cargo-depgraph

cargo depgraph [options] | dot -Tpng > graph.png
```
