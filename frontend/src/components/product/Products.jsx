import * as React from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import ProductCard from "../product/ProductCard";
import Slider from '@mui/material/Slider';
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { setProducts,fetchProducts } from "../../features/product/productSlice";
import { useLazyGetProductsQuery } from "../../features/product/productApiSlice";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";


const Products = () => {


  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 25000]);
  // const [category, setCategory] = React.useState("");

  const { keyword } = useParams();
  
  const dispatch = useDispatch();
  
  const [getProducts] = useLazyGetProductsQuery();
  const { loading,products, productCount, resultPerPage } = useSelector(state => state.products);
  
  React.useEffect( () => {
    (async () => {
      dispatch(fetchProducts())
    const newData = await getProducts([keyword,currentPage],false)
    if (newData && newData.data) {
     dispatch(setProducts(newData.data.data))
    }})()

  }, [dispatch,currentPage,keyword,productCount])

  const [ratings, setRatings] = React.useState(0);

  //   const {
  //     products,
  //     loading,
  //     error,
  //     productsCount,
  //     resultPerPage,
  //     filteredProductsCount,
  //   } = useSelector((state) => state.products);

  //   const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  //   let count = filteredProductsCount;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            {/* <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul> */}

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < productCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
export default Products;