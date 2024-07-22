import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import LayoutClient from "./components/LayoutClient";
import ProductForm from "./components/ProductForm";
import Dashboard from "./pages/admin/Dashboard";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import LayoutAdmin from "./components/admin/LayoutAdmin";

function App() {
  // const handleRemove = async (_id: number) => {
  //   if (confirm("Are you sure?")) {
  //     await instance.delete(`/products/${_id}`);
  //     setProducts(products.filter((item) => item._id !== _id && item));
  //   }
  // };
  // const handleAdd = (product: Product) => {
  //   (async () => {
  //     const { data } = await instance.post("/products", product);
  //     setProducts([...products, data]);
  //     navigate("/");
  //   })();
  // };
  // const handleUpdate = (product: Product) => {
  //   (async () => {
  //     const { data } = await instance.put(`/products/${product._id}`, product);
  //     setProducts(
  //       products.map((item) => (item._id === data._id ? data : item))
  //     );
  //     navigate("/");
  //   })();
  // };
  // const handleProduct = async (data: Product) => {
  //   if (data._id) {
  //     //logic edit
  //     await instance.patch(`/products/${data._id}`, {
  //       ...data,
  //       _id: undefined,
  //     });
  //     fetchProducts();
  //   } else {
  //     //logic add
  //     const res = await instance.post("/products", data);
  //     console.log(res);
  //     setProducts([...products, res.data.data]);
  //   }
  //   navigate("/admin");
  // };
  return (
    <div>
      <main>
        <Routes>
          /** client **/
          <Route path="/" element={<LayoutClient />}>
            <Route path="/" element={<Home />} />
          </Route>
          /** admin **/
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/product-add" element={<ProductForm />} />
            <Route path="/admin/product-update/:id" element={<ProductForm />} />
          </Route>
          <Route path="/login" element={<AuthForm isLogin />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
