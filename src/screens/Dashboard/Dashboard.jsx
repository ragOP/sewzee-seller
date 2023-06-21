import { toast } from "react-hot-toast"
import { useEffect, useState } from "react"


// local imports
import "./Dashboard.css"
import API from "../../services/common"


const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({})


  const loadSellerDetails = async () => {
    try {
      const res = await API.get("/api/seller/");
      console.log(res)
      if (res.status === 200) {
        setUserDetails(res.data)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  useEffect(() => {
    loadSellerDetails()
  }, [])


  return (
    <div className="dashboardWrapper">
      <h1>Welcome to {userDetails?.data?.name}</h1>
    </div>
  )
}

export default Dashboard