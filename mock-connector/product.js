import fulfillAPIRequest from '../props/fulfillAPIRequest'
import createProduct from './utils/createProduct'
import createAppData from './utils/createAppData'
import getBase64ForImage from 'react-storefront/utils/getBase64ForImage'

const fetch = require("node-fetch");

async function fetchSAP(){
    try {
      let response = await fetch("https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product?%24top=1&%24inlinecount=none&%24select=Product", {
        headers: {
          Accept: 'application/json',
          APIKey: 'p0X0Cbz4POIsW1qqknFvLR35UBU3XkJA'
        }
      });
      return await response.json();
    } 
    catch(error) {
      console.log(error)
    }
  }

function asciiSum(string = '') {
  return string.split('').reduce((s, e) => s + e.charCodeAt(), 0)
}

export default async function product(params, req, res) {
  const { id, color, size } = params

  let val = await fetchSAP();
  product = val.d.results[0].Product;
  console.log('HELP ME')
  console.log(product)

  const result = await fulfillAPIRequest(req, {
    appData: createAppData,
    pageData: () => getPageData(product),
  })

  // When a query parameter exists, we can fetch custom product data
  // pertaining to specific filters.
  if (color || size) {
    const data = await getPageData(id)
    data.carousel = { index: 0 }
    // A price for the fetched product variant would be included in
    // the response, but for demo purposes only, we are setting the
    // price based on the color name.
    const mockPrice = (asciiSum(color) + asciiSum(size)) / 100
    data.product.price = mockPrice
    data.product.priceText = `$${mockPrice.toFixed(2)}`
    return data
  }

  return result
}

async function getPageData(id) {
  console.log("aeoifjoaiefjoiaefjoiaefjoiaejfoiaejfoij")

  const result = {
    title: `Product ${id}`,
    product: createProduct(id),
    breadcrumbs: [
      {
        text: `Home`,
        href: '/',
      },
      {
        text: `Subcategory ${id}`,
        as: `/s/${id}`,
        href: '/s/[subcategoryId]',
      },
    ],
  }

  const mainProductImage = result.product.media.full[0]
  mainProductImage.src = await getBase64ForImage(mainProductImage.src)

  return result
}
