

File Makefile:
```
.PHONY: doc

# Genarate docs
#
# Usage:
#   make doc
doc:
        cargo doc --no-deps
        mkdir -p docs/docs
        cp -r target/doc/* docs/docs/

```
