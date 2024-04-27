import { TextInput, Textarea } from "flowbite-react";

import { useParams, useLoaderData, useNavigate } from "react-router-dom";

const EditService = () => {
    const { id } = useParams();
    const { name, description } = useLoaderData();
    const navigate = useNavigate();


    const serviceUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const description = form.description.value;
        //console.log(Name, Description);





        const carOBJ = { name, description };
        console.log(carOBJ);
        fetch(`http://localhost:5000/update-service/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(carOBJ)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Service updated successfully");
                form.reset();
                navigate('/admin/dashboard/manage-service')
            })
            .catch(error => {
                console.error('Error:', error);

            });



    }

    const styles = {
        input: {
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
    
        }
      }

    return (
        <div className="px-4 my-12" style={{color:"black"}}>
            <h2 className="mb-8 text-3xl font-bold">Update Promotion Code</h2>
            <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={serviceUpdate}>
                <div className="flex justify-between mb-4">
                    <div className='w-1/2 mr-2'>
                        <div className="mb-2">
                            <label htmlFor="Name" className="block" value="Name">Name</label>
                        </div>
                        <TextInput id="name" className="w-full" required type="text" defaultValue={name} style={styles.input}/>
                    </div>
                </div>
                <div className="">
                    <div className='mb-2'>
                        <label htmlFor="Description" className="block" value="Description">Description</label>
                    </div>
                    <Textarea id="description" className="w-full" placeholder="Description" required rows={4} defaultValue={description} style={styles.input}/>
                </div>
                <input type="submit" value="Update" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
            </form>
        </div>
    );

}
export default EditService;
