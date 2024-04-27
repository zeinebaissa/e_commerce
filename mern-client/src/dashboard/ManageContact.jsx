import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import del from "../assets/delete.png";

const ManageContact = () => {
    const [allContact, setAllContact] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState(() => {
        const storedContacts = localStorage.getItem('selectedContacts');
        return storedContacts ? JSON.parse(storedContacts) : [];
    });
    const [filterApplied] = useState(false);
    //setFilterApplied

    useEffect(() => {
        fetch('http://localhost:5000/all-contacts')
            .then(res => res.json())
            .then(data => setAllContact(data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedContacts', JSON.stringify(selectedContacts));
    }, [selectedContacts]);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
        if(confirmDelete) { 
        fetch(`http://localhost:5000/delete-contact/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => {
                alert('Contact deleted successfully !');
                // Filter out the deleted contact from the list
                setAllContact(allContact.filter(contact => contact._id !== id));
            })
            .catch(error => console.error('Error deleting contact:', error));
        }
    }

    const toggleSelectContact = (id) => {
        if (selectedContacts.includes(id)) {
            setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
        } else {
            setSelectedContacts([...selectedContacts, id]);
        }
    };

    /*const applyFilter = () => {
        setFilterApplied(true);
    };

    const clearFilter = () => {
        setFilterApplied(false);
    };*/

    const filteredContacts = filterApplied ? allContact.filter(contact => !selectedContacts.includes(contact._id)) : allContact;

    return (
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Manage Your Contact</h2>
            {/*<div className="mb-4">
                {filterApplied ? (
                    <button onClick={clearFilter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        All Client
                    </button>
                ) : (
                    <button onClick={applyFilter} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Client not contacted
                    </button>
                )}
            </div>
            */}
            <Table className='lg:w-[1180px]'>
                <Table.Head className="divide-y">
                    <Table.HeadCell className="text-center">Contacted</Table.HeadCell>
                    <Table.HeadCell className="text-center">Name</Table.HeadCell>
                    <Table.HeadCell className="text-center">Number</Table.HeadCell>
                    <Table.HeadCell className="text-center">Email</Table.HeadCell>
                    <Table.HeadCell className="text-center">Comment</Table.HeadCell>
                    <Table.HeadCell className="text-center">Action</Table.HeadCell>
                </Table.Head>
                {filteredContacts.map((contact,index) => (
                    <Table.Body className={`divide-y ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`} key={contact._id}>
                        <Table.Row className="dark:border-gray-700">
                            <Table.Cell className="text-center"><input type="checkbox" checked={selectedContacts.includes(contact._id)} onChange={() => toggleSelectContact(contact._id)} /></Table.Cell>
                            <Table.Cell className="text-center">{contact.name}</Table.Cell>
                            <Table.Cell className="text-center">{contact.number}</Table.Cell>
                            <Table.Cell className="text-center">{contact.email}</Table.Cell>
                            <Table.Cell className="text-center">{contact.comment}</Table.Cell>
                            <Table.Cell className="flex justify-center"><button onClick={() => handleDelete(contact._id)} ><img src={del} className="w-6 h-6 mr-3" /></button></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
            </Table>
        </div>

    );
}

export default ManageContact;
