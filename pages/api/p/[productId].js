import { product } from 'C:/Users/Joshua De los Santos/Desktop/m2/myapp/mock-connector'

export default async function pdp(req, res) {
  const { productId } = req.query
  console.log('In pdp:');
  console.log(productId);
  return res.json(await product({ id: productId }, req, res))
}
