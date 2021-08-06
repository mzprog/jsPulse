import { Route } from '../../system/Route/Route.js'

const router = new Route()

// Add routes from here
router.get("/from","to")
router.get('/',"Home")

export default  router 