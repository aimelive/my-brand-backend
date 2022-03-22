import cloudinary from "cloudinary"
import dotenv from "dotenv";

dotenv.config({
    path: "../../../config.env"
})



cloudinary.config({
    cloud_name: 'dofeqwgfb',
    api_secret: 'X-P0DVyJnIyGDnLxCw_2_jRntVY',
    api_key: 818752698674912
})

export default cloudinary