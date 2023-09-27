import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductForm from "../../components/product/productForm/ProductForm";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productToEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productToEdit);
  const [productImage, setProductImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productToEdit);

    setImagePreview(
      productToEdit && productToEdit.image ? productToEdit.image.filePath : null
    );

    setDescription(
      productToEdit && productToEdit.description ? productToEdit.description : ""
    );
  }, [productToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setProductImage(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (!product.name || !product.category || !product.quantity || !product.price) {
      // Add form validation to ensure required fields are filled.
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("price", product.price);
    formData.append("description", description);

    if (productImage) {
      // Validate file type (e.g., allow only image files)
      if (productImage.type.startsWith("image/")) {
        formData.append("image", productImage);
      } else {
        alert("Please upload a valid image file (JPEG or PNG).");
        return;
      }
    }

    try {
      await dispatch(updateProduct({ id, formData }));
      await dispatch(getProducts());
      navigate("/dashboard");
    } catch (error) {
      // Handle API request errors and provide feedback to the user.
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product. Please try again.");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
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

export default EditProduct;
