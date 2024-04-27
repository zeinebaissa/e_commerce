
import { TextInput, Textarea } from "flowbite-react";
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
//import { useState } from 'react';

const EditArticles = () => {
  const { id } = useParams();
  const { name, category, price, color, description, image_url } = useLoaderData();
  console.log(name, category)
  const navigate = useNavigate();
  //const [setImageURL] = useState('');
  const ArticleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const price = form.price.value;
    const color = form.color.value;
    const description = form.description.value;
    const imageurl = form.imageurl.files[0];

    // Vérifier si une nouvelle image a été sélectionnée
    if (imageurl) {
      const reader = new FileReader();
      reader.readAsDataURL(imageurl);
      reader.onloadend = () => {
        const newImageURL = reader.result;
        const articleOBJ = { name, category, price, color, description, imageurl: newImageURL };
        updateArticle(articleOBJ);
      };
    } else {
      // Si aucune nouvelle image n'a été sélectionnée, garder l'ancienne image
      const articleOBJ = { name, category, price, color, description, imageurl: image_url };
      updateArticle(articleOBJ);
    }
  };

  const updateArticle = (articleOBJ) => {
    fetch(`http://localhost:5000/update-article/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(articleOBJ)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert("Article updated successfully");
        navigate('/admin/dashboard/manage-articles');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const styles = {
    input: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',

    }
  }


  return (
    <div className="px-4 my-12 " style={{ color: "black" }} >
      <h2 className="mb-8 text-3xl font-bold">Update Article</h2>
      <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={ArticleUpdate}>
        <div className="flex justify-between mb-4">
          <div className='w-1/2 mr-2'>
            <div className="mb-2">
              <label htmlFor="Name" className="block" value="Name">Name</label>
            </div>
            <TextInput id="name" className="w-full" placeholder="Name" required type="text" defaultValue={name} style={styles.input} />
          </div>
          <div className='w-1/2 ml-2'>
            <div className="mb-2">
              <label htmlFor="category" className="block" value="category">Category</label>
            </div>
            <TextInput id="category" className="w-full" placeholder="category" required type="text" defaultValue={category} style={styles.input} />
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className='w-1/2 mr-2'>
            <div className="mb-2">
              <label htmlFor="Price" className="block" value="Price">Price</label>
            </div>
            <TextInput id="price" className="w-full" placeholder="Price" required type="text" defaultValue={price} style={styles.input} />
          </div>

        </div>
        <div className="flex justify-between mb-4">
          <div className='w-1/2 ml-2'>
            <div className="mb-2">
              <label htmlFor="Color" className="block" value="Color">Color</label>
            </div>
            <TextInput id="color" className="w-full" placeholder="Color" required type="text" defaultValue={color} style={styles.input} />
          </div>
        </div>
        <div className="">
          <div className='mb-2'>
            <label htmlFor="Description" className="block" value="Description">Description</label>
          </div>
          <Textarea id="description" className="w-full" placeholder="Description" required rows={4} defaultValue={description} style={styles.input} />
        </div>
        <div className="">
          <div className='mb-2'>
            <label htmlFor="Image URL" className="block" value="Image Url" >Image</label>
          </div>
          <input id="imageurl" type="file" accept="image/*" />
          {image_url && <img src={image_url} alt="Service Image" className="mt-2" style={{ maxWidth: '200px' }} />}
        </div>
        <input type="submit" value="Update" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
      </form>
    </div>
  );
}

export default EditArticles;
