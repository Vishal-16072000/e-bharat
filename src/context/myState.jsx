import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/FirebaseConfig";

const myState = (props) => {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageURL: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addproduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageURL == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add Product Successfully");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      setLoading(false);
      getProductData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  

  const editHandle = (item) => {
    // console.log(item);
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);

    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      window.location.href = "/dashboard";
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted succesfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const toggleMode = () => {
    if (mode == "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);

    try{
      const result = await getDocs(collection(fireDB, "orders"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      })
      setOrder(ordersArray);
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try{
      const result = await getDocs(collection(fireDB, "users"))
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
        setLoading(false);
      })
      setUser(usersArray);
      setLoading(false);

    }catch(error){
      setLoading(false);
      console.log(error);
    }
  }


  const [searchKey, setSearchKey] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterPrice, setFilterPrice] = useState('');


  useEffect(()=>{
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addproduct,
        product,
        deleteProduct,
        editHandle,
        updateProduct, 
        order, 
        user, 
        searchKey,
        setSearchKey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default myState;
