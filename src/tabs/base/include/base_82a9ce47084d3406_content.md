


```rust
fn batch<Matrix: AsRef<[Row]>, Row: AsRef<[f32]>>(features: Matrix) {
    for row in features.as_ref() {
        for cell in row.as_ref() {
            print!("{} ", cell);
        }
        println!("");
    }
}
fn main(){
  let v = vec![vec![1f32],vec![2f32]];
  batch(v);

  let v = [[1f32],[2f32]];
  batch(v);
}
```
