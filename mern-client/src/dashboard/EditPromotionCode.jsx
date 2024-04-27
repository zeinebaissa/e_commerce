import { TextInput, Textarea } from "flowbite-react";

import { useParams, useLoaderData, useNavigate } from "react-router-dom";

const EditPromotionCode = () => {
    const { id } = useParams();
    const { promotioncode, percentage } = useLoaderData();
    const navigate = useNavigate();


    const promotionCodeUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const promotioncode = form.promotioncode.value;
        const percentage = form.percentage.value;





        const PromotionOJB = { promotioncode, percentage };
        console.log(PromotionOJB);
        fetch(`http://localhost:5000/update-promo/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(PromotionOJB)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                alert("Promotion Code updated successfully");
                form.reset();
                navigate('/admin/dashboard/manage-promotion-code')
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
            <form className="flex lg:w-[1180px] flex-col flex-wrap gap-4" onSubmit={promotionCodeUpdate}>
                <div className="flex justify-between mb-4">
                    <div className='w-1/2 mr-2'>
                        <div className="mb-2">
                            <label htmlFor="Promotion Code" className="block" value="Promotion Code">Promotion Code</label>
                        </div>
                        <TextInput id="promotioncode" className="w-full" required type="text" defaultValue={promotioncode} style={styles.input}/>
                    </div>
                </div>
                <div className="">
                    <div className='mb-2'>
                        <label htmlFor="Percentage" className="block" value="Percentage">Percentage</label>
                    </div>
                    <Textarea id="percentage" className="w-full" placeholder="Description" required  defaultValue={percentage} style={styles.input}/>
                </div>
                <input type="submit" value="Update" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer" />
            </form>
        </div>
    );

}
export default EditPromotionCode;
