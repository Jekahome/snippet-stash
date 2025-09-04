


<pre><code class="language-rust">
   extern crate atomic;
 
   #[test]
    fn atomic_i128() {
        let a = Atomic::new(0i128);
        assert_eq!(
            Atomic::<i128>::is_lock_free(),
            cfg!(feature = "nightly") & cfg!(target_has_atomic = "128")
        );
        assert_eq!(format!("{:?}", a), "Atomic(0)");
        assert_eq!(a.load(SeqCst), 0);
        a.store(1, SeqCst);
        assert_eq!(a.swap(2, SeqCst), 1);
        assert_eq!(a.compare_exchange(5, 45, SeqCst, SeqCst), Err(2));
        assert_eq!(a.compare_exchange(2, 3, SeqCst, SeqCst), Ok(2));
        assert_eq!(a.fetch_add(123, SeqCst), 3);
        assert_eq!(a.fetch_sub(-56, SeqCst), 126);
        assert_eq!(a.fetch_and(7, SeqCst), 182);
        assert_eq!(a.fetch_or(64, SeqCst), 6);
        assert_eq!(a.fetch_xor(1, SeqCst), 70);
        assert_eq!(a.fetch_min(30, SeqCst), 71);
        assert_eq!(a.fetch_max(-25, SeqCst), 30);
        assert_eq!(a.load(SeqCst), 30);
    }
</code></pre>
