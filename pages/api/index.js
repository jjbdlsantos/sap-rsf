import { home } from 'C:/Users/Joshua De los Santos/Desktop/m2/myapp/mock-connector'

export default async function(req, res) {
  res.json(await home(req, res))
}
