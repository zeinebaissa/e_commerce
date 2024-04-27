import { TextInput, Textarea } from "flowbite-react";
const articleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.Name.value;
    const gategory = form.Gategory.value;
    const price = form.Price.value;
    const color = form.Color.value;
    const description = form.Description.value;
    const imageurl = form.imageurl.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
        const image_url = reader.result;
    const carOBJ = { name, gategory, price,color, description,image_url };
    console.log(carOBJ);
    fetch("http://localhost:5000/upload-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(carOBJ)
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        alert("Article uploaded successfully");
        form.reset(); // Reset the form after successful submission
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error, show an alert or feedback to the user
      });
    };

    if (imageurl) {
        reader.readAsDataURL(imageurl);
    }
};


const UploadCar = () => {
    const styles = {
        input: {
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
    
        }
      }
  return (
    <div className="px-4 my-12" style={{color:"black"}}>
        <h2 className="mb-8 text-3xl font-bold">Upload Article</h2>
        <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={articleSubmit}>
            <div className="flex justify-between mb-4">
                <div className='w-1/2 mr-2'>
                    <div className="mb-2">
                        <label htmlFor="Name" className="block" value="Name">Name</label>
                    </div>
                    <TextInput id="Name" className="w-full" placeholder="Name" required type="text" style={styles.input} />
                </div>
                <div className='w-1/2 ml-2'>
                    <div className="mb-2">
                        <label htmlFor="Gategory" className="block" value="Model">Gategory</label>
                    </div>
                    <TextInput id="Gategory" className="w-full" placeholder="Gategory" required type="text" style={styles.input} />
                </div>
            </div>
            <div className="flex justify-between mb-4">
                <div className='w-1/2 mr-2'>
                    <div className="mb-2">
                        <label htmlFor="Price" className="block" value="Price">Price</label>
                    </div>
                    <TextInput id="Price" className="w-full" placeholder="Price" required type="text" style={styles.input} />
                </div>
                <div className='w-1/2 ml-2'>
                    <div className="mb-2">
                        <label htmlFor="Color" className="block" value="Color">Color</label>
                    </div>
                    <TextInput id="Color" className="w-full" placeholder="Color" required type="text" style={styles.input} />
                </div>
            </div>
            <div className="">
                <div className='mb-2'>
                    <label htmlFor="Description" className="block" value="Description">Description</label>
                </div>
                <Textarea id="Description" className="w-full" placeholder="Description" required rows={4} style={styles.input}/>
            </div>
            <div className="">
                <div className='mb-2'>
                    <label htmlFor="Image URL" className="block" value="Image Url">Image URL</label>
                </div>
                <input id="imageurl" type="file" accept="image/*" required />
            </div>
            <input type="submit" value="Upload" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
        </form>
    </div>
  );
};

export default UploadCar;
