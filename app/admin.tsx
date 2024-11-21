import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firestore, storage } from "../.firebase/firebase";
import {
  toggleSignIn,
  toggleSignOut,
  sendPasswordReset,
  stateChange,
} from "../.firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/components/Admin.css";

interface Product {
  id?: string;
  name: string;
  description: string;
  price: string;
  category: string[];
  link: string;
  image: string | null;
  hoverImage: string | null;
}

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: "",
    category: [],
    link: "",
    image: null,
    hoverImage: null,
  });
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [hoverImageFile, setHoverImageFile] = useState<File | null>(null);
  const navigation = useNavigation();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const hoverImageInputRef = useRef<HTMLInputElement>(null);

  /**
   * Effect to listen for user authentication state changes.
   * Animates the component's fade-in and translation effects.
   * @param - none
   * @return {void}
   */
  useEffect(() => {
    const unsubscribe = stateChange((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  /**
   * Handles the user login process.
   * @param {React.FormEvent} e - The event triggered by the form submission.
   * @return {Promise<void>}
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await toggleSignIn(email, password);
      Swal.fire("Success", "Logged in successfully", "success");
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  /**
   * Handles the user logout process.
   * @return {Promise<void>}
   */
  const handleLogout = async () => {
    try {
      await toggleSignOut();
      Swal.fire("Success", "Logged out successfully", "success");
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  /**
   * Handles the password reset process.
   * Sends a password reset email to the user.
   * @return {Promise<void>}
   */
  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset(email);
      Swal.fire("Success", "Password reset email sent", "success");
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  /**
   * Fetches products from Firestore and updates the product list.
   * @return {Promise<void>}
   */
  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const productsList: Product[] = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(productsList);
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  /**
   * Handles input changes for the product form.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by input changes.
   * @return {void}
   */
  const handleProductInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles changes to the image file input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by file input changes.
   * @return {void}
   */
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  /**
   * Handles changes to the hover image file input.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by file input changes.
   * @return {void}
   */
  const handleHoverImageFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setHoverImageFile(file);
  };

  /**
   * Handles adding a new product to Firestore.
   * @param {React.FormEvent} e - The event triggered by the form submission.
   * @return {Promise<void>}
   */
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      Swal.fire({
        title: "Processing request",
        text: "Please wait while we add your product...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      let imageUrl = "";
      let hoverImageUrl = "";

      // Upload product image
      if (imageFile) {
        const uniqueImageName = `${Date.now()}_${imageFile.name}`;
        const imageRef = storageRef(storage, `products/${uniqueImageName}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Upload hover image
      if (hoverImageFile) {
        const uniqueHoverImageName = `${Date.now()}_${hoverImageFile.name}`;
        const hoverImageRef = storageRef(
          storage,
          `products/${uniqueHoverImageName}`
        );
        const hoverSnapshot = await uploadBytes(hoverImageRef, hoverImageFile);
        hoverImageUrl = await getDownloadURL(hoverSnapshot.ref);
      }

      // Add new product to Firestore
      await addDoc(collection(firestore, "products"), {
        ...newProduct,
        image: imageUrl,
        hoverImage: hoverImageUrl,
      });
      Swal.close();
      Swal.fire("Success", "Product added successfully", "success");
      fetchProducts(); // Refresh product list
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: [],
        link: "",
        image: null,
        hoverImage: null,
      }); // Clear form
      setImageFile(null);
      setHoverImageFile(null);
      // Clear the file inputs using useRef
      if (imageInputRef.current) imageInputRef.current.value = "";
      if (hoverImageInputRef.current) hoverImageInputRef.current.value = "";
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  /**
   * Utility function to extract the path from a Firebase Storage URL.
   * @param {string} url - The Firebase Storage URL.
   * @return {string} - The extracted path from the URL.
   */ const extractPathFromUrl = (url: string): string => {
    try {
      const parsedUrl = new URL(url);

      // Extract and decode the path after the '/o/' part
      const path = decodeURIComponent(parsedUrl.pathname.split("/o/")[1]);

      return path;
    } catch (error) {
      console.error("Error extracting path from URL:", error);
      return "";
    }
  };

  /**
   * Handles updating an existing product in Firestore.
   * @param {React.FormEvent} e - The event triggered by the form submission.
   * @return {Promise<void>}
   */
  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update this product? This may involve uploading a new image and deleting the old one.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "No, cancel!",
    });

    if (!result.isConfirmed) {
      return;
    }

    Swal.fire({
      title: "Processing request",
      text: "Please wait while we add your product...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    if (selectedProductId) {
      try {
        let imageUrl = "";
        let hoverImageUrl = "";

        // Get the previous image URLs
        const productDoc = await getDoc(
          doc(firestore, "products", selectedProductId)
        );

        if (!productDoc.exists()) {
          // Product has been deleted; exit editing mode
          Swal.close();
          handleExit();
          return;
        }

        const previousProductData = productDoc.data();
        const previousImageUrl = previousProductData?.image || null;
        const previousHoverImageUrl = previousProductData?.hoverImage || null;

        // Upload new product image if selected
        if (imageFile) {
          const uniqueImageName = `${Date.now()}_${imageFile.name}`;
          const imageRef = storageRef(storage, `products/${uniqueImageName}`);
          const snapshot = await uploadBytes(imageRef, imageFile);
          imageUrl = await getDownloadURL(snapshot.ref);
        } else {
          imageUrl = previousImageUrl || "";
        }

        // Upload new hover image if selected
        if (hoverImageFile) {
          const uniqueHoverImageName = `${Date.now()}_${hoverImageFile.name}`;
          const hoverImageRef = storageRef(
            storage,
            `products/${uniqueHoverImageName}`
          );
          const hoverSnapshot = await uploadBytes(
            hoverImageRef,
            hoverImageFile
          );
          hoverImageUrl = await getDownloadURL(hoverSnapshot.ref);
        } else {
          hoverImageUrl = previousHoverImageUrl || "";
        }

        // Update product in Firestore
        await updateDoc(doc(firestore, "products", selectedProductId), {
          ...newProduct,
          image: imageUrl || newProduct.image,
          hoverImage: hoverImageUrl || newProduct.hoverImage,
        });

        // Determine if the old images should be deleted
        const oldImageUrl = previousImageUrl;
        const oldHoverImageUrl = previousHoverImageUrl;

        // Only delete the old product image if it is different from the new image
        if (
          oldImageUrl &&
          imageUrl &&
          oldImageUrl !== imageUrl &&
          oldImageUrl !== hoverImageUrl
        ) {
          try {
            const oldImagePath = extractPathFromUrl(oldImageUrl);
            const oldImageRef = storageRef(storage, oldImagePath);
            await deleteObject(oldImageRef); // Remove image URL from Firestore
            await updateDoc(doc(firestore, "products", selectedProductId), {
              image: imageUrl || newProduct.image,
            });
          } catch (imageError) {
            console.error("Error deleting old product image:", imageError);
          }
        }

        // Only delete the old hover image if it is different from the new hover image
        if (
          oldHoverImageUrl &&
          hoverImageUrl &&
          oldHoverImageUrl !== hoverImageUrl &&
          oldHoverImageUrl !== imageUrl
        ) {
          try {
            const oldHoverImagePath = extractPathFromUrl(oldHoverImageUrl);
            const oldHoverImageRef = storageRef(storage, oldHoverImagePath);
            await deleteObject(oldHoverImageRef);
            // Remove hover image URL from Firestore
            await updateDoc(doc(firestore, "products", selectedProductId), {
              hoverImage: hoverImageUrl || newProduct.hoverImage,
            });
          } catch (hoverImageError) {
            console.error("Error deleting old hover image:", hoverImageError);
          }
        }
        Swal.close();
        Swal.fire("Success", "Product Updated Successfully!", "success");
        fetchProducts(); // Refresh product list

        // Clear form
        setNewProduct({
          name: "",
          description: "",
          price: "",
          category: [],
          link: "",
          image: null,
          hoverImage: null,
        });
        setSelectedProductId(null);
        setImageFile(null);
        setHoverImageFile(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
        if (hoverImageInputRef.current) hoverImageInputRef.current.value = "";
      } catch (error: any) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  /**
   * Handles deleting a product from Firestore and its associated images from Firebase Storage.
   * @param {string} id - The ID of the product to be deleted.
   * @return {Promise<void>}
   */
  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this job data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });
    if (!result.isConfirmed) {
      return;
    }
    try {
      // Fetch the product document from Firestore
      const productDoc = await getDoc(doc(firestore, "products", id));
      if (!productDoc.exists()) {
        Swal.fire("Error", "Product not found", "error");
        return;
      }
      const productData = productDoc.data();
      const { image, hoverImage } = productData || {};
      // Delete images from Firebase Storage if they exist
      if (image) {
        try {
          const imagePath = extractPathFromUrl(image);
          const imageRef = storageRef(storage, imagePath);
          await deleteObject(imageRef);
        } catch (imageError) {
          console.error("Error deleting image:", imageError);
        }
      }
      if (hoverImage) {
        try {
          const hoverImagePath = extractPathFromUrl(hoverImage);
          const hoverImageRef = storageRef(storage, hoverImagePath);
          await deleteObject(hoverImageRef);
        } catch (hoverImageError) {
          console.error("Error deleting hover image:", hoverImageError);
        }
      }
      // Delete the product document from Firestore
      await deleteDoc(doc(firestore, "products", id));
      // Show success message
      Swal.fire("Success", "Product Deleted Successfully", "success");
      // Refresh product list
      fetchProducts();
    } catch (error: any) {
      Swal.fire("Error", error.message, "error");
    }
  };

  /**
   * Handles the selection of a product for editing.
   * Displays a confirmation dialog before proceeding.
   * @param {Product} product - The product object to be edited.
   * @return {Promise<void>}
   */
  const handleEditProduct = async (product: Product) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to edit this product in the form above. Any changes you make will overwrite the existing product data. Do you want to continue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, continue",
      cancelButtonText: "Nevermind",
    });
    if (result.isConfirmed) {
      // Proceed with editing the product if user confirms
      setEditingProduct(product);
      setNewProduct(product);
      setSelectedProductId(product.id || null);
    } else {
      // Handle when user cancels
      Swal.fire("Cancelled", "Product editing was cancelled.", "info");
    }
  };

  /**
   * Clears the form fields and exits editing mode.
   * @return {void}
   */
  const handleExit = () => {
    // Clear the form
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: [],
      link: "",
      image: null,
      hoverImage: null,
    });
    // Reset selected product ID to exit editing mode
    setSelectedProductId(null);
    setImageFile(null);
    setHoverImageFile(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (hoverImageInputRef.current) hoverImageInputRef.current.value = "";
  };

  // Define your options
  const categories = [
    { label: "Clothing", value: "Clothing" },
    { label: "Accessories", value: "Accessories" },
    { label: "Services", value: "Services" },
    { label: "Collectibles", value: "Collectibles" },
    { label: "Apps", value: "Apps" },
  ];

  /**
   * Handles checkbox changes for product categories.
   * Updates the selected categories in the product state.
   * @param {string} value - The category value that was checked or unchecked.
   * @return {void}
   */
  const handleCheckboxChange = (value) => {
    setNewProduct((prev) => {
      const newCategories = prev.category.includes(value)
        ? prev.category.filter((cat) => cat !== value) // Remove the category if already selected
        : [...prev.category, value]; // Add the category if not selected

      return { ...prev, category: newCategories };
    });
  };

  // Render the login form if the user is not logged in
  if (isLoading) return <div>Loading...</div>;
  if (!user) {
    return (
      <div className="container mt-5 login-form">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="login-header text-center mb-4">
              Haumāna Admin Portal
            </h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success w-100 mt-3">
                Login
              </button>
              <button
                type="button"
                className="btn btn-link w-100 mt-2"
                onClick={handlePasswordReset}
              >
                Forgot Password?
              </button>
              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => navigation.navigate("AboutUs")}
              >
                Back to About Us
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Render the admin dashboard if the user is logged in
  return (
    <div className="admin-container">
      <div className="container mt-4 admin-dashboard">
        <h1 className="dashboard-header text-center mb-3">
          Haumāna Admin Dashboard
        </h1>
        <button className="btn btn-danger mb-3" onClick={handleLogout}>
          Logout
        </button>
        <form
          onSubmit={selectedProductId ? handleUpdateProduct : handleAddProduct}
        >
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={handleProductInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className="form-control"
              placeholder="Product Description"
              name="description"
              value={newProduct.description}
              onChange={handleProductInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              className="form-control"
              placeholder="Start with '$'"
              name="price"
              value={newProduct.price}
              onChange={handleProductInputChange}
              required
            />
          </div>
          <label>Category (Multiple Choice)</label>
          <div
            className="form-group"
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "3px",
              marginTop: "3px",
            }}
          >
            <div className="d-flex flex-wrap">
              {categories.map((category) => (
                <div className="form-check me-3" key={category.value}>
                  <input
                    type="checkbox"
                    id={category.value}
                    value={category.value}
                    className="form-check-input"
                    checked={newProduct.category.includes(category.value)}
                    onChange={() => handleCheckboxChange(category.value)}
                    style={{ cursor: "pointer", backgroundColor: "lightgray" }}
                  />
                  <label
                    htmlFor={category.value}
                    className="form-check-label"
                    style={{ cursor: "pointer" }}
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="link"> Link</label>
            <input
              type="text"
              id="link"
              className="form-control"
              placeholder="https://"
              name="link"
              value={newProduct.link}
              onChange={handleProductInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              className="form-control"
              accept=".png, .jpg, .jpeg"
              ref={imageInputRef}
              onChange={handleImageFileChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="hoverImage">Hover Image</label>
            <input
              type="file"
              id="hoverImage"
              className="form-control"
              accept=".png, .jpg, .jpeg"
              ref={hoverImageInputRef}
              onChange={handleHoverImageFileChange}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 mt-3">
            {selectedProductId ? "Update Product" : "Add Product"}
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100 mt-3"
            onClick={() => handleExit()}
          >
            {selectedProductId ? "Exit" : "Start Over"}
          </button>
        </form>
        <h2 className="text-center mt-4">List of Products</h2>
        <p className="text-center mb-1">(Edit and Delete Products Here)</p>
        <div className="scrollable-content">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Image</th>
                <th>Hover Image</th>
                <th>Category</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.image as string}
                        alt={product.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>
                      <img
                        src={product.hoverImage as string}
                        alt={`${product.name} Hover`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </td>
                    <td>{product.category.join(", ")}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className="btn btn-warning mb-2 rem"
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(product.id!)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No products available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
