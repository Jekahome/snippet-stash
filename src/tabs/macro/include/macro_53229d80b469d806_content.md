

```rust
impl Die {
    pub fn new(faces: u8) -> Die {
        Die { faces }
    }
    pub fn d2() -> Die {
        Self::new(2)
    }
    pub fn d4() -> Die {
        Self::new(4)
    }
    pub fn d6() -> Die {
        Self::new(6)
    }
    // Many more functions for other dice
}
fn main(){}
```

**Используем макрос для уменьшения дублирования кода**

Cargo.toml:

```toml
[dependencies]
paste = "1.0.5"
```

```rust
macro_rules! gen_dice_fn_for {
    ( $( $x:expr ),* ) => {
        paste! {                            
            $(
            #[allow(dead_code)]
            pub fn [<d$x>]() -> Die {       
                Self::new($x)
            }
            )*
        }
    };
}

impl Die {
    pub fn new(faces: u8) -> Die {
        Die { faces }
    }
    gen_dice_fn_for![2, 4, 6, 8, 10, 12, 20, 30, 100];   
}
fn main(){}
```
