




Группировки различных типов вместе
<pre><code class="language-rust">
trait Graph<N, E> {
    fn has_edge(&self, &N, &N) -> bool;
    fn edges(&self, &N) -> Vec<E>;
}

struct Node<T> {
    position:T
}

//ребро
struct Edge< N>{
    start:N,
    end:N
}
 //узел и ребро
struct MyGraph<N, E>{
    n:N,e:E
}
impl <N, E>Graph<N, E> for MyGraph<N, E> {
    fn has_edge(&self, n1:&N, n2:&N) -> bool{
        true
    }

    fn edges(&self, n:&N) -> Vec<E>{
        let mut vec = vec![];
        vec
    }
}
fn distance<N, E, G: Graph<N, E>>(graph: &G, start: &N, end: &N) -> u32 {
    // print!("fn distance {:?} ",start.position);
    10
}
fn main(){
    let start:i32 = 1;
    let end:i32 = 2;
    let n_head = Node{position:start};
    let n_end = Node{position:end};
    let e = Edge{start:n_head,end:n_end};
    print!("fn distance {:?} ",e.start.position);

    // тип передается через структуру
    // тип E теперь значит Edge
    let n  = Node{position:start};
    let gr =  MyGraph{n:n ,e:e};

    let n_head2 = Node{position:start};
    let n_end2 = Node{position:end};

    let n = distance(&gr,&n_head2,&n_end2);
    print!("fn distance {:?} ",n);

 // вернуть должны Vec<Edge>
    let mut v = gr.edges(&n_head2);

   if gr.has_edge(&n_head2,&n_end2){
       print!("yes");
   }
}
</code></pre>




Чтобы сформировать какого-либо вида `Graph`, нужны соответствующие типы `E` и `N`, собранные вместе с помощью ассоциированных типов
<pre><code class="language-rust">
trait Graph {
     type N;
     type E;

     fn has_edge(&self, &Self::N, &Self::N) -> bool;
     fn edges(&self, &Self::N) -> Vec<Self::E>;
}

 //Теперь наши клиенты могут абстрагироваться от определенного Graph
struct Node {
     position:i32
}

//ребро
struct Edge< N>{
    start:N,
    end:N
}
//узел и ребро
struct MyGraph<N, E>{
    n:N,e:E
}

impl  <N, E>Graph  for MyGraph<N, E>  {
     type N = Node;
     type E = Edge<N>;


     fn has_edge(&self, n1: &Node, n2: &Node) -> bool {
         true
     }

     fn edges(&self, n: &Node) -> Vec<Edge<N>> {
         Vec::new()
     }
}
fn distance<G: Graph>(graph: &G, start: &G::N, end: &G::N) -> u32 {
     print!("fn distance  ",);
     10
}
fn main(){
    let start:i32 = 1;
    let end:i32 = 2;
    let n_head = Node{position:start};
    let n_end = Node{position:end};
    let e = Edge{start:n_head,end:n_end};
    print!("fn distance {:?} ",e.start.position);

    // тип передается через структуру
    // тип E теперь значит Edge
    let n  = Node{position:start};
    let gr =  MyGraph{n:n ,e:e};

    let n_head2 = Node{position:start};
    let n_end2 = Node{position:end};

    let n = distance(&gr,&n_head2,&n_end2);
    print!("fn distance {:?} ",n);

    // вернуть должны Vec<Edge>
    let mut v = gr.edges(&n_head2);

    if gr.has_edge(&n_head2,&n_end2){
        print!("yes");
    }
 }
</code></pre>
