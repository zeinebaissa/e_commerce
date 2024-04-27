import { TextInput, Textarea } from "flowbite-react";

import { useParams, useLoaderData, useNavigate } from "react-router-dom";

const EditPromotionCode = () => {
    const { id } = useParams();
    const { name, email,password } = useLoaderData();
    const navigate = useNavigate();


    const userUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        //console.log(Name, Description);





        const UserOBJ = { name, email,password };
        console.log(UserOBJ);
        fetch(`http://localhost:5000/update-client/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(UserOBJ)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("User updated successfully");
                form.reset();
                navigate('/admin/dashboard/manage-user')
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
            <h2 className="mb-8 text-3xl font-bold">Update User Information</h2>
            <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={userUpdate}>
                <div className="flex justify-between mb-4">
                    <div className='w-1/2 mr-2'>
                        <div className="mb-2">
                            <label htmlFor="name" className="block" value="name">Username</label>
                        </div>
                        <TextInput id="name" className="w-full" required type="text" defaultValue={name} style={styles.input}/>
                    </div>
                </div>
                <div className="">
                    <div className='mb-2'>
                        <label htmlFor="Email" className="block" value="Percentage">Email</label>
                    </div>
                    <Textarea id="email" className="w-full" placeholder="Email" required  defaultValue={email} style={styles.input}/>
                </div>
                <div className="">
                    <div className='mb-2'>
                        <label htmlFor="Percentage" className="block" value="Percentage">Password</label>
                    </div>
                    <Textarea id="password" className="w-full" placeholder="Password" required  defaultValue={password} style={styles.input}/>
                </div>
                <input type="submit" value="Update" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
            </form>
        </div>
    );

}
export default EditPromotionCode;
