


<pre><code class="language-rust">
struct A{
    value:Vec<i32>
}
impl std::iter::IntoIterator for A {
    type Item = i32;
    type IntoIter = WraperA;
    fn into_iter(self) -> Self::IntoIter{
        WraperA::new(self.value)
    }
}
impl<'a> IntoIterator for &'a mut A{
    type Item = i32;
    type IntoIter = RefWraperA<'a>;
    fn into_iter(self) -> Self::IntoIter{
        RefWraperA::new(self)
    }
}
impl<'a> IntoIterator for &'a A {
    type Item = i32;
    type IntoIter = RefWraperA<'a>;
    fn into_iter(self) -> Self::IntoIter{
        RefWraperA::new(self)
    }
}
struct WraperA(usize,A);
impl WraperA{
    fn new(value:Vec<i32>)->Self{
        Self(0,A{value})
    }
} 
impl std::iter::Iterator for WraperA {
    type Item = i32;
    fn next(&mut self) -> Option<Self::Item> {
        if self.0 < self.1.value.len() {
            self.0+=1;println!("+++");
            return Some(*self.1.value.get(self.0-1).unwrap());
        }
        None
    }
}
struct RefWraperA<'a>(usize,&'a A);
impl<'a> RefWraperA<'a>{
    fn new(a:&'a A)->Self{
        Self(0,a)
    }
} 
impl<'a> std::iter::Iterator for RefWraperA<'a> {
    type Item = i32;
    fn next(&mut self) -> Option<Self::Item> {
        if self.1.value.len() > self.0 {
            self.0+=1;
            return Some(*self.1.value.get(self.0-1).unwrap());
        }
        None
    }
}

fn main() {
// impl WraperA
    let a = A{value:vec![1,2,3]};
    let mut iter = a.into_iter();
    assert_eq!(iter.next(),Some(1));
    assert_eq!(iter.next(),Some(2));
    assert_eq!(iter.next(),Some(3));
    assert_eq!(iter.next(),None);

// для impl RefWraperA<'a> 
// impl<'a> IntoIterator for &'a mut A
// impl<'a> IntoIterator for &'a A
   
    let mut a = A{value:vec![1,2,3]};
    let mut iter = (& a).into_iter();
    assert_eq!(iter.next(),Some(1));
    assert_eq!(iter.next(),Some(2));
    assert_eq!(iter.next(),Some(3));
    assert_eq!(iter.next(),None);
// второй раз используем
    for v in a {print!("{v}");}
}
</code></pre>
