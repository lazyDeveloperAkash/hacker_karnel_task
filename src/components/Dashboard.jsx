import { useEffect, useState } from 'react';
import { BsCurrencyRupee } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CreateProduct from './CreateProduct';
import { toast } from 'react-toastify';

const DashBoard = () => {
    const [createProductModal, setCreateProductModal] = useState(false);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    // Check for user authentication
    useEffect(() => {
        const user = localStorage.getItem('user_token');
        if (!user){ 
            toast.warn("Please login to access the resorce")
            navigate('/')
        };
    }, [navigate, products])
    

    // Remove a product by its index
    const removeProduct = (idx) => {
        setProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(idx, 1);
            return updatedProducts;
        });
    };

    // Dynamically filter products based on the search input
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase().trim())
    );

    return (
        <div className="relative min-h-[100vh] p-6 bg-slate-100">
            <Navbar setCreateProductModal={setCreateProductModal} setSearch={setSearch} />
            {products.length === 0 ? (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <h1 className="text-xl">Please Create a new Product!</h1>
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="w-full h-[70vh] flex items-center justify-center">
                    <h1 className="text-xl">Product not found!</h1>
                </div>
            ) : (
                <ul className="flex flex-col items-center gap-8">
                    {filteredProducts.map((product, idx) => (
                        <div
                            key={idx}
                            style={{ animationDelay: `${idx * 0.2}s` }}
                            className="bg-white relative flex flex-col gap-2 mx-auto px-6 py-2 shadow-md leading-relaxed rounded-lg overflow-hidden w-full md:w-[70%]"
                        >
                            <div className="flex justify-between items-center">
                                <div className="w-1/3">
                                    <h2 className="text-xl font-bold">{product.name}</h2>
                                </div>
                                <h2 className="text-xl flex items-center">
                                    <BsCurrencyRupee />
                                    {product.price}
                                </h2>
                                <h2
                                    onClick={() => removeProduct(idx)}
                                    className="text-xl cursor-pointer"
                                >
                                    <IoMdClose />
                                </h2>
                            </div>
                        </div>
                    ))}
                </ul>
            )}
            {createProductModal && (
                <CreateProduct
                    setCreateProductModal={setCreateProductModal}
                    setProducts={setProducts}
                    products={products}
                />
            )}
        </div>
    );
};

export default DashBoard;