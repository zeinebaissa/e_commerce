import banner from "../assets/model (2).png"
import { Link } from "react-router-dom"
const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center" style={{ backgroundColor: '#F0F0F0' }}>
      <div className="flex w-full felx-col ms:flex-row justify-betwen items-center gap-40 py-50">
      <div className="md:w-1/3 space-y-8 h-full">
          <img src={banner} alt="banner" />
          </div>
        
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-4xl font-extrabold leading-snug text-black md:w-4/5">Veiled Dreams:<span className="text-pink-700"> Welcome To Our FOR HER Shop</span>
          </h2>
          <h2 className="font-bold md:w-5/5 text-black-100" style={{color:"black"}}>
          Empower Your Elegance with For Her: Your Destination for Modest Fashion. Discover a curated collection of modest apparel tailored for the contemporary Muslim woman. From graceful veils to chic ensembles, embrace style that resonates with your values. Elevate your wardrobe with confidence and grace, exclusively at For Her.
          </h2>
          <br/>
          <br/>
          <Link className="bg-pink-700 text-white px-6 py-3 rounded-full hover:bg-pink-900" to='/shop'>Shop Now</Link>
        </div>
        
      </div>

    </div>
  )
}

export default Banner
