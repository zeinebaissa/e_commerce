import { FaTruck, FaShippingFast, FaCheckCircle } from 'react-icons/fa';

const WhyUs = () => {
  return (
    <div className="mx-auto py-7" style={{width:'90%'}}>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
      </div>
      <div className="flex justify-center items-center space-x-6" >
        {/* Fast Delivery Section */}
        <div className="w-full md:w-1/3 text-center">
        <br/>
          <div className="bg-gray-200 rounded-full p-4 inline-block">
            <FaTruck className="text-4xl text-gray-600" />
          </div>
          
          <h3 className="text-lg font-bold text-gray-800 mt-4">Fast Delivery</h3>
          <p className="text-gray-600 mt-2">Get your products delivered quickly with our fast shipping services.</p>
        </div>
        {/* Free Shipping Section */}
        <div className="w-full md:w-1/3 text-center">
          <div className="bg-gray-200 rounded-full p-4 inline-block">
            <FaShippingFast className="text-4xl text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mt-4">Free Shipping</h3>
          <p className="text-gray-600 mt-2">Enjoy free shipping on all orders, no minimum purchase required.</p>
        </div>
        {/* Best Quality Section */}
        <div className="w-full md:w-1/3 text-center">
          <div className="bg-gray-200 rounded-full p-4 inline-block">
            <FaCheckCircle className="text-4xl text-gray-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mt-4">Best Quality</h3>
          <p className="text-gray-600 mt-2">We ensure the highest quality standards for all our products.</p>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
