import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Image,
  Text,
  Alert,
  AlertIcon,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
  Divider,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import "./SingleProductPage.css";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/productReducer/action";
import Contact from "../../components/pages/Contact";
import CartPage from "./CartPage";

export const SingleProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, isLoading, isError } = useSelector(
    (store) => store.productReducer
  );
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [isAuth, SetisAuth] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const toast = useToast();

  // if the token is deleted navigate to Login
  useEffect(() => {
    if (!localStorage.getItem("loginToken")) {
      navigate("/login");
    }
  }, []);

  // to get product ID to add to Cart
  // console.log("@@products", products);
  // console.log("@@@productID", productID);

  const dispatch = useDispatch();

  const [alertStatus, SetAlert] = useState(false);
  const [art, setArt] = useState();

  const { _id } = useParams();

  let alt = "";

  // Getting individual Data Dynamically
  // console.log(_id);
  const singlePageData = products?.find((ele) => ele._id === _id);
  // console.log("Id of product", _id);
  // console.log("SinglePageData", singlePageData);

  //  API call for dynamic product fetch {(_id)}
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  /*  Now to make sure ADD to CART works properly, we need the product ID and at the same time which user is logged in so that we can keep a track of who is buying what..thorugh handleADDtoCART */

  const handleADDtoCART = (product_ID) => {
    let productID = product_ID;
    const user = localStorage.getItem("user");
    const userObjinLS = JSON.parse(user);
    const userID = userObjinLS._id;
    const data = { userID: userID };

    console.log("user", userID);
    console.log("Product ID", productID);
    // Generally userID can be retreived with getItem in backend also, but this is temporary, will change later with help of decoding in backend
    // console.log({ productID });
    // console.log(JSON.parse(userID));
    // got productID and userID from frontEnd, now logic can be written on the BE
    /*   const parsedUserID = JSON.parse(userID); 
    //to remove the double quotes
 */

    // Logic for Duplicate

    const payload = { productID, userID };
    // const headers = { loginToken: localStorage.getItem("loginToken") };
    axios
      .post("http://localhost:4500/shop/add-to-cart", payload)
      .then((res) => {
        // console.log(res.data);
        if (res.data.status === 200) {
          setRefresh(!refresh);
        }
      })
      .catch((err) => {
        console.log(err, "30");
      });
  };

  const [val, setval] = useState(1);

  return (
    <div>
      {alertStatus ? (
        <Alert
          mt={2}
          status="success"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          variant="subtle"
        >
          <AlertIcon />
          Product is Successfully Added to Cart
        </Alert>
      ) : (
        alt
      )}
      <div className="breadCrum">
        <Text textAlign={"center"} ml={400} className="breadcrumText">
          Home <ChevronRightIcon /> Shop <ChevronRightIcon />{" "}
          {singlePageData?.title}
        </Text>
      </div>

      <div className="ImageFlex">
        <div className="ImageFlexImage">
          <Box
            className="smallImages"
            width={"20%"}
            // style={{ border: "1px solid red" }}
          >
            <Image
              width={"100%"}
              onClick={() => setval(1)}
              cursor="pointer"
              src={singlePageData?.image[0]}
              mb={5}
            />
            <Image
              width={"100%"}
              onClick={() => setval(2)}
              cursor="pointer"
              src={singlePageData?.image[1]}
              mb={5}
            />
            <Image
              width={"100%"}
              onClick={() => setval(2)}
              cursor="pointer"
              src={singlePageData?.image[2]}
              mb={5}
            />
            <Image
              width={"100%"}
              onClick={() => setval(2)}
              cursor="pointer"
              src={singlePageData?.image[3]}
              mb={5}
            />
          </Box>
          <Box className="BigImageContainer">
            <Image
              className="BigImage"
              // width={"1050px"}
              src={
                val == 1 ? singlePageData?.image[0] : singlePageData?.image[1]
              }
            />
          </Box>
        </div>
        <div
          className="content"
          style={{
            // border: "1px solid red",
            textAlign: "center",
            width: "90%",
            // margin: "auto",
          }}
        >
          <Heading as="h5" size={"lg"}>
            {singlePageData?.title}
          </Heading>
          <p style={{ marginTop: "20px" }}>
            <strong> {singlePageData?.subtitle}</strong>
          </p>
          <p
            style={{
              fontSize: "20px",
              marginTop: "20px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            <strong> $ {singlePageData?.price}</strong>
          </p>
          <p style={{ fontSize: "16px", marginTop: "20px" }}>
            {singlePageData?.desc}
          </p>
          <p style={{ fontSize: "16px", marginTop: "20px" }}>
            <strong>{singlePageData?.year}</strong>
            <br />
            <strong>Essay by </strong> {singlePageData?.artist} <br /> <br />
            <strong> Published by </strong> Marian Goodman Gallery, New York{" "}
            <br /> <br />
            <strong>ISBN</strong> 0-944219-19-5 <br /> <br />
          </p>
          <p>
            {" "}
            <strong>in stock:</strong> {singlePageData?.inStock} <br />
            <br />
          </p>
          <div
            className="ButtonContainer"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Button
              // onClick={onOpen}
              onClick={() => {
                handleADDtoCART(singlePageData._id);
                toast({
                  position: "top",
                  title: "Art added to Cart !",
                  // description: "Please fill in all the fields.",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              // key={size}
              // sending product ID directly through function
            >
              ADD TO CART
            </Button>
            <Button ref={btnRef} onClick={() => onOpen()}>
              SHOW CART
            </Button>
          </div>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size={"md"}
          >
            <DrawerOverlay />

            <DrawerContent css={{ "&::-webkit-scrollbar": { width: "6px" } }}>
              <DrawerCloseButton />
              <DrawerHeader>Cart : 4</DrawerHeader>

              <DrawerBody css={{ "&::-webkit-scrollbar": { width: "6px" } }}>
                <CartPage />
              </DrawerBody>

              <DrawerFooter>
                <Button colorScheme="blue" mr={3}>
                  Checkout
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <Contact />
    </div>
  );
};

// ******************************* DRAWER *****************
