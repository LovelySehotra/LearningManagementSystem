import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";


function Profile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData } = useSelector((state) =>  state?.auth?.data);


    return(

    
    <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center">
            <div className="my-10 flex flex-col gap-4 rounded-lg p-4 w-96 text-white shadow-[0_0_10px_black]">
                <img src={userData?.avatar?.secure_url}
                    className="w-40 m-auto rounded-full border border-black" />
                <h3 className="text-xl font-semibold text-center capitalize">
                    {userData?.fullName}
                </h3>
             
                <div className="grid grid-cols-2">
                    <p>Email: </p><p>{userData?.email}</p>
                    <p>Role: </p><p>{userData?.role}</p>
                    <p>Subscription: </p>
                    <p>{userData?.subscription?.status === "active" ? "Action" : "Inactive"}</p>

                </div>
                <div className="flex items-center justify-center gap-2">
                    <Link
                        to="/changepassword"
                        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                    >
                        Change Password

                    </Link>
                  
                </div>
            </div>

        </div>

    </HomeLayout>
    )

}

export default Profile