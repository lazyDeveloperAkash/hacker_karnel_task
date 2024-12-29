import { BiTask } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

const Navbar = ({ setCreateProductModal, setSearch }) => {
    const navigate = useNavigate();
    const logout = () => {
        if (!window.confirm("Do you want to logout?")) return;
        localStorage.removeItem("user_token");
        navigate('/');
    }
    return (
        <>
            <div className='flex items-center justify-between w-full md:w-[70%] mx-auto p-4 mb-6 bg-white rounded-2xl'>
                <div className="relative w-[50%] max-w-sm">
                    <IoSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3998c0] focus:border-[#3998c0]"
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCreateProductModal(true)}
                        className='flex items-center justify-between px-1 md:px-4 py-2 rounded-md bg-[#3998c0] text-white cursor-pointer'>
                        <BiTask />
                        <p className="md:text-sm text-xs md:pl-2">Create Product</p>
                    </button>
                    <div onClick={logout}>
                        <HiOutlineDotsVertical />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar