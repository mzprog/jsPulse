import { Route } from '../../system/Route/Route.js'

const router = new Route()

// Add routes from here
router.get('/',"Home")
router.get('/user/{id}',"Home::user")

export default  router 