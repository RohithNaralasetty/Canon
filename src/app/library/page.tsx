const placeholderBooks = [
  { title: "Red Rising", author: "Pierce Brown", bucket: "Loved" },
  { title: "Project Hail Mary", author: "Andy Weir", bucket: "Loved" },
  { title: "Dune", author: "Frank Herbert", bucket: "Mid" },
];

export default function LibraryPage() {
  return (
    <main>
      <h1>My library</h1>
      <p className="lead">
        Placeholder list. Later: search Open Library, pick a sentiment bucket,
        and add to your library.
      </p>

      <div className="actions">
        <span className="btn" style={{ opacity: 0.5, cursor: "not-allowed" }}>
          Add book (not implemented)
        </span>
      </div>

      <ul className="placeholder-list" aria-label="Placeholder library">
        {placeholderBooks.map((book) => (
          <li key={book.title}>
            <span className="book-cover" aria-hidden />
            <div>
              <strong>{book.title}</strong>
              <br />
              <span style={{ fontSize: "0.9rem", color: "#666" }}>
                {book.author} · {book.bucket}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
