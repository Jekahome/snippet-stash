


<pre><code class="language-rust">
use std::marker::PhantomData;
use std::ops::Index;

#[derive(Debug)]
struct IndexVertex<S>(usize,PhantomData<S>);
impl IndexVertex<FromIndex>{
    fn new(index:usize)->Self{
        Self(index,PhantomData)
    }
}

#[derive(Debug)]
struct Vertexes<W>{
    indexes: Vec<Option<Vec<(W,IndexVertex<FromIndex>)>>>
}
impl<W> Vertexes<W>{
    fn new(data: Vec<Option<Vec<(W,IndexVertex<FromIndex>)>>>) -> Self{
        Self{// from -> to
           indexes: data
        }
    }
}
impl<W> Index<IndexVertex<FromIndex>> for Vertexes<W> {
    type Output = Option<Vec<(W,IndexVertex<FromIndex>)>>;
    fn index(&self, index: IndexVertex<FromIndex>) -> &Self::Output {
       &self.indexes[index.0]
    }
}
impl<W> Index<IndexVertex<ToIndex>> for Vertexes<W> {
    type Output = Option<Vec<(W,IndexVertex<ToIndex>)>>;

    fn index(&self, index: IndexVertex<ToIndex>) -> &Self::Output {
    
      &self.indexes[..][index.0] 
        
    }
}
#[derive(Debug,Clone,Copy)]
struct FromIndex;
#[derive(Debug,Clone,Copy)]
struct ToIndex;

/// FromIndex -- ToIndex
impl From<IndexVertex<FromIndex>> for IndexVertex<ToIndex> {
    fn from(index: IndexVertex<FromIndex>) -> IndexVertex<ToIndex> {
        IndexVertex(index.0,PhantomData)
    }
}
/// ToIndex -- FromIndex
impl From<IndexVertex<ToIndex>> for IndexVertex<FromIndex> {
    fn from(index: IndexVertex<ToIndex>) -> IndexVertex<FromIndex> {
        IndexVertex(index.0,PhantomData)
    }
}

fn main(){
   let index = IndexVertex::new(1);
  
    let data = vec![ 
       Some(vec![(8,IndexVertex::new(1)),(4,IndexVertex::new(2))]), // 0=>1,2
       Some(vec![(9,IndexVertex::new(2))]),       // 1=>2
       Some(vec![(6,IndexVertex::new(0))]),       // 2=>0
    ];
        
    let vertexes = Vertexes::new(data);
    let from_index = IndexVertex::new(0);
    for vertexes in vertexes[from_index].iter(){
        for v  in vertexes{
             println!("W={} index={}",v.0,v.1.0);
        }
    }
    
    let from_index = IndexVertex::new(0);
    let to_index:IndexVertex<ToIndex> = from_index.into();
     for vertexes in vertexes[to_index].iter(){ ... }
}
</code></pre>
