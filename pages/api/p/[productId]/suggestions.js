import { productSuggestions } from 'C:/Users/Joshua De los Santos/Desktop/m2/myapp/mock-connector'

export default async function(req, res) {
  const { productId } = req.query
  res.json(await productSuggestions(productId, req, res))
}
