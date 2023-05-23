export function ToyFilter({ onSort, onInStock }) {

return (
    <section className="toy-filter"> 
        <label htmlFor="sort">Sort:</label>
        <select onChange={onSort}  name="sort" id="sort">
            <option value="name">Name</option>
            <option value="createdAt">Created At</option>
            <option value="price">Price</option>
        </select>
        <label htmlFor="filter">Filter:</label>
        <input type="checkbox" onChange={onInStock} id="inStock" />
          <label htmlFor="inStock">In stock</label>


    </section>
)
}