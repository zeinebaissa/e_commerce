import { TextInput, Textarea } from "flowbite-react";
const serviceSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const promotioncode = form.promotioncode.value;
  const percentage = form.percentage.value;




  const carOBJ = { promotioncode, percentage };
  console.log(carOBJ);
  fetch("http://localhost:5000/upload-promo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(carOBJ)
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Service uploaded successfully");
      form.reset(); 
    })
    .catch(error => {
      console.error('Error:', error);

    });
};



const UploadService = () => {
  const styles = {
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',

    }
  }
  return (
    <div className="px-4 my-12" style={{color:"black"}}>
      <h2 className="mb-8 text-3xl font-bold">Upload Promotion Code</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={serviceSubmit}>
        <div className="flex flex-wrap gap-4">
          <div className='w-full'>
            <div className="mb-2">
              <label htmlFor="Name" className="block" value="Name">Promotion Code</label>
            </div>
            <TextInput id="promotioncode" className="w-full" placeholder="Promotion Code" required type="text" style={styles.input} />
          </div>
          <div className='w-full'>
            <div className="mb-2">
              <label htmlFor="Description" className="block" value="Brand">Percentage</label>
            </div>
            <Textarea id="percentage" className="w-full" style={styles.input} placeholder="Percentage" required type="text" />
          </div>
        </div>
        <input type="submit" value="Upload" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
      </form>
    </div>
  );
};

export default UploadService;
