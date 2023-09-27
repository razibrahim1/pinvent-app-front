import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState(null); // Use null for initial state
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null); // Add an error state

  const { name, category, price, quantity } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const generateSKU = (category) => {
    const prefix = category.slice(0, 3).toUpperCase();
    const timestamp = Date.now();
    return `${prefix}-${timestamp}`;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    // Basic form validation
    if (!name || !category || !quantity || !price || !productImage) {
      setError("All fields are required");
      return;
    }

    // Additional validation for numeric fields
    if (isNaN(quantity) || isNaN(price)) {
      setError("Quantity and price must be numeric values");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", productImage);

    try {
      await dispatch(createProduct(formData));
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to create the product. Please try again later.");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Product</h3>
      {error && <p className="error-message">{error}</p>}
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default AddProduct;
