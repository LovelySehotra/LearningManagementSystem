import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();
    return (
        <div>
{/* CSS is pending */}
            <div>

                <img
                    className=""
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail" />
                <div>
                    <h2>
                        {data?.title}hello
                    </h2>
                    <p>
                    {data?.description}
                    </p>
                    <p>
                       <span>Category:</span> 
                       {data?.category}
                    </p>
                    <p>
                        <span>Total lecture:</span>
                        {data?.numberoflectures}
                    </p>
                    <p>
                        <span>Instructor :</span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>


        </div>
    )
}
export default CourseCard;