import * as React from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/loader/Loader";
import ProductCard from "../product/ProductCard";
import Slider from '@mui/material/Slider';
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import { setProducts, fetchProducts } from "../../features/product/productSlice";
import { useLazyGetProductsQuery } from "../../features/product/productApiSlice";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";


const Products = () => {

  const dispatch = useDispatch();
  const minDistance = 1000;
  const { keyword } = useParams();


  const [getProducts] = useLazyGetProductsQuery();
  const { loading, products, productCount, resultPerPage, filteredProductCount } = useSelector(state => state.products);
  let count = filteredProductCount; 
  const categories = [
    'Laptop',
    'Footwear',
    'Clothes',
    'SmartPhones',
  ]


  const [currentPage, setCurrentPage] = React.useState(1);
  const [price, setPrice] = React.useState([0, 50000]);
  const [ratings, setRatings] = React.useState(0);
  const [category, setCategory] = React.useState("");


  React.useEffect(() => {
    (async () => {
      dispatch(fetchProducts())
      const newData = await getProducts([keyword, currentPage, price,category,ratings], false)
      if (newData && newData.data) {
        dispatch(setProducts(newData.data.data))
      }
    })()

  }, [dispatch, currentPage, keyword, productCount, price,category,ratings,getProducts])



  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice, activeThumb) => {
    if (!Array.isArray(newPrice)) {
      return;
    }

    if (activeThumb === 0) {
      setPrice([Math.min(newPrice[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newPrice[1], price[0] + minDistance)]);
    }
  };

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

          <div className="filterBox"phome>
            <Typography variant="h6" mb="2rem">Filters</Typography>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={50000}
              disableSwap
              step={5000}
              marks
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category.toLowerCase())}
                >
                  {category}
                </li>
              ))}
            </ul>

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

          {resultPerPage < count && (
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