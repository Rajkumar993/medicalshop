import { gql } from "@apollo/client";


export const SHOP_DETAILS=gql`
query Banners($filter: bannerFilterInput) {
  banners(filter: $filter) {
    image
  }
}

`

export const GET_PRODUCTS = gql`
query Products($filter: productfilter) {
  products(filter: $filter) {
    id
    name
    prize
    featureImage
    category
    description
    isAddedToCart {
      inCart
    }
  }
}
`;

export const GET_CART = gql`
  query Cart($filter: CartFilter1) {
    cart(filter: $filter) {
      name
      id
      productId
      quantity
      featureImage
      prize
      Discount
    }
  }
`;
export  const GET_WHISHLIST =gql `
query Query($filter: WishlistFilterInput) {
wishlist(filter: $filter) {
 featureImage
 title
 productId
 prize
}
}
`
;
export const GET_BLOGS=gql`
query Query($filter: blogFilter) {
  Blog(filter: $filter) {
    image
    description
    timestamp
    title
    productName
    id
  }
}`

export const GET_CATEGORIES=gql`
query Categories($filter: shop) {
  categories(filter: $filter) {
    category
  }
}
`
export const GET_TOP_PRODUCT=gql`
query TopProducts($filter: top) {
  topProducts(filter: $filter) {
    productImage {
      image
    }
    category
    description
    discount
    featureImage
    name
    id
    prize
  }
}`
export const GET_SHOP_ADDRESS=gql`
query Shop($filter: ShopInput) {
  shop(filter: $filter) {
    address
    city
    country
    pincode
    phone
    name
    deliveryCharge
  }
}`