//Används ej längre
import "./pagination.css";
export function Pagination({ offset, number, totalResults, loadMore }) {
  return (
    <nav className="pagination">
      <button
        className="btn_load"
        onClick={() => loadMore(parseInt(offset) - parseInt(number))}
      >
        Previous {number}
      </button>
      Showing {offset} to {offset + number} of {totalResults} total search hits.
      <button
        className="btn_load"
        onClick={() => loadMore(parseInt(offset) + parseInt(number))}
      >
        Next {number}
      </button>
    </nav>
  );
}
