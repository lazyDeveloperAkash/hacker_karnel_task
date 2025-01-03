import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

const CreateProduct = ({ products, setProducts, setCreateProductModal }) => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: 0
    });

    // change state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevData) => ({ 
            ...prevData, 
            [name]: name === 'price' ? value.replace(/^0+/, '') : value 
        }));
    };

    // create product
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate product name duplication
        const isDuplicate = products.some((product) => product.name === e.target.name.value);
        if (isDuplicate) {
            setNewProduct({ name: "", price: "" });
            toast.error(`Already have a product with this name: ${e.target.name.value}`);
            return;
        }

        // Validate price
        if (newProduct.price <= 0) {
            toast.error("Product price must be greater than 0");
            return;
        }

        // Add new product to the list
        setProducts((prevData) => ([{ ...newProduct }, ...prevData]));
        toast.success("Product created successfully");
        setCreateProductModal(false);
    };

    return (
        <div
            id='profile-container'
            onClick={(e) => e.target.id === 'profile-container' && setCreateProductModal(false)}
            className='absolute top-0 left-0 z-10 min-h-[100vh] min-w-[100vw] flex items-center justify-center bg-[#0000007f]'
        >
            <div className="max-w-[70%] mx-auto p-4 bg-white rounded-xl">
                <div className='w-full flex justify-end p-4 pb-0'>
                    <div onClick={() => setCreateProductModal(false)}>
                        <IoMdClose className='cursor-pointer' size={25} />
                    </div>
                </div>
                <h1 className="text-3xl font-bold mb-4">Create Product</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-[#3998c0]"
                    />
                    <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">Product Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Product Price"
                        value={newProduct.price}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded focus:outline-[#3998c0] appearance-none"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-[#3998c0] text-white rounded hover:bg-[#2d799a]"
                    >
                        Create Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
