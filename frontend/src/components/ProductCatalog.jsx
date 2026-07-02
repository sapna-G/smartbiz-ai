import { useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaBoxOpen,
  FaSearch,
  FaRupeeSign,
  FaLayerGroup,
} from "react-icons/fa";

function ProductCatalog({ products, setProducts }) {
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function addProduct() {
    if (!form.name || !form.category || !form.price || !form.stock) {
      alert("Fill all fields");
      return;
    }

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: form.name,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        sales: 0,
      },
    ]);

    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });
  }

  function deleteProduct(id) {
    setProducts(products.filter((p) => p.id !== id));
  }

  function getStatus(product) {
    if (product.stock <= 5) return "Low Stock";
    if ((product.sales || 0) > 10) return "Best Seller";
    return "In Stock";
  }

  return (
    <div className="products-page">
      <div className="products-header card">
        <div>
          <p className="section-label">Inventory Intelligence</p>
          <h1>Product Management</h1>
          <span>Track products, stock, pricing and AI-generated sales.</span>
        </div>

        <div className="product-search">
          <FaSearch />
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {products.some((product) => product.stock <= 5) && (
        <div className="stock-alert">
          ⚠️ Some products are running low on stock. Please restock them soon.
        </div>
      )}

      <div className="product-form-card card">
        <h2>Add New Product</h2>

        <div className="product-form">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
          />

          <button onClick={addProduct}>
            <FaPlus />
            Add Product
          </button>
        </div>
      </div>

      <div className="product-card-grid">
        {filteredProducts.length === 0 ? (
          <div className="card empty-products">
            <FaBoxOpen />
            <h2>No products found</h2>
            <p>Add your first product or generate an invoice to auto-create inventory.</p>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const status = getStatus(product);

            return (
              <div className="product-card card" key={product.id}>
                <div className="product-card-top">
                  <div className="product-icon">
                    <FaBoxOpen />
                  </div>

                  <span
                    className={
                      status === "Low Stock"
                        ? "stock-low"
                        : status === "Best Seller"
                        ? "best-seller"
                        : "stock-good"
                    }
                  >
                    {status}
                  </span>
                </div>

                <h2>{product.name}</h2>
                <p className="product-category">
                  <FaLayerGroup /> {product.category}
                </p>

                <div className="product-price">
                  <FaRupeeSign />
                  {product.price}
                </div>

                <div className="product-metrics">
                  <div>
                    <span>Stock</span>
                    <strong>{product.stock}</strong>
                  </div>

                  <div>
                    <span>Sales</span>
                    <strong>{product.sales || 0}</strong>
                  </div>
                </div>

                <div className="product-actions">
                  <button className="edit-product-btn">Edit</button>

                  <button
                    className="delete-product-btn"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <FaTrash />
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ProductCatalog;