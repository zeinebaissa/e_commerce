import { Card } from 'flowbite-react';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Shop = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/all-articles')
      .then(res => res.json())
      .then(data => setArticles(data))
  }, []);

  useEffect(() => {
    const results = articles.filter(article =>
      (article.name && article.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (article.category && article.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
  }, [searchTerm, articles]);
  

  const handleSearch = () => {
    const results = articles.filter(article =>
      article.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.gategory.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div style={{ backgroundColor: '#F0F0F0', minHeight: '100vh' }}> {/* Set background color and minimum height */}
      <div className="mt-10 px-4 lg:px-24" style={{ marginTop: '70px', marginBottom: '5px', textAlign: 'center', marginInlineEnd: '100' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Discover Our Collection</h2>

        <div className="flex justify-center">
          <div className="flex mb-4">
            <input
            style={{color:"black"}}
              type="text"
              placeholder="Search by brand or model"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <button
              className="bg-pink-700 hover:bg-pink-500 text-white px-4 py-1 rounded-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>


        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {searchResults.map(article => (
            <Card key={article._id} className="rounded-lg overflow-hidden shadow-lg">
              <img src={article.image_url} alt="car" className="w-full h-48 object-cover" style={{width:"400px",height:"400px"}}/>
              <div className="p-4" style={{color:"black"}}>
                <h3 className="text-xl font-bold mb-2">{article.name}</h3>
                <p className="text-lg font-semibold mb-4">{article.price}</p>
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
                  <div className="">
                    <div className="flex space-x-2 mb-2 lg:mb-0">
                    <Link to={`/contact`}>
        <button 
          className="bg-green-700 text-white px-3 py-1 rounded-full text-sm focus:outline-none transition duration-300"
          style={{ 
            backgroundColor: isHovered1 ? "#5B696B" : "gray"
          }}
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          Add to Cart
        </button>
      </Link>
                      <Link to={`/article/${article._id}`}>
        <button 
          className="bg-green-700 text-white px-3 py-1 rounded-full text-sm focus:outline-none transition duration-300"
          style={{ 
            backgroundColor: isHovered ? "#805050" : "#CE8F8A"
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          More Details
        </button>
      </Link>

                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
