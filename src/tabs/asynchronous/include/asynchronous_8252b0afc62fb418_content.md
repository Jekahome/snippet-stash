


<pre><code class="language-rust">
let timer = tokio_timer::Timer::default();
    // Error out when timeout is reached
    let timeout = timer.sleep(time::Duration::from_millis(950)).then(|_| {
        future::err(io::Error::new(io::ErrorKind::Other, "Timeout"))
    });
    let handle = core.handle();

    // this returns IoFuture = BoxFuture<T, io::Error>;
    let addresses = tokio_dns::CpuPoolResolver::new(1 as usize).resolve("www.google.cz");
    let socket = addresses.and_then(|all_addresses| {
        let mut ipv4_addresses =  all_addresses.iter().filter(|x| is_ipv4(**x));
        let addr = ipv4_addresses.next().unwrap();
        let sock = TcpStream::connect(&SocketAddr::new(*addr, 443), &handle);
        sock.map_err(|e| {
            println!("{:?}", e);
            io::Error::new(io::ErrorKind::Other, e)
        })
    });
    let tls_handshake = socket.and_then(|socket| {
        println!("Got socket");
        let cx = TlsConnector::builder().unwrap().build().unwrap();
        let tls = cx.connect_async("www.google.cz", socket);
        tls.map_err(|e| {
            println!("{:?}", e);
            io::Error::new(io::ErrorKind::Other, e)
        })
    });
    let request = tls_handshake.and_then(|socket| {
        println!("SSL Handshake Successful");
        let write_all = tokio_io::io::write_all(socket, "\
            GET / HTTP/1.0\r\n\
            Host: www.google.cz\r\n\
            \r\n\
        ".as_bytes());
        println!("Wrote to socket");
        write_all.map_err(|e| {
            println!("{:?}", e);
            io::Error::new(io::ErrorKind::Other, e)
        })
    });
    let response = request.and_then(|(socket, _request)| {
        let read_till_end = tokio_io::io::read_to_end(socket, Vec::new());
        println!("Read till end of socket");
        read_till_end
    });
    let waiter = response.select(timeout).map(|(win, _)| {
        let (_socket, data) = win;
        data
    });
    let result = core.run(waiter);
</code></pre>
