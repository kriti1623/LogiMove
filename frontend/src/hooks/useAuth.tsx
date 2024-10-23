import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "@/config";

interface AuthResponse {
  userId: string;
  name: string;
  email : string;
  token: string;
  userRole: "user" | "captain"; // Assuming your API returns userRole
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // States for user registration
  const [userRole, setUserRole] = useState<"user" | "captain" | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Load user details from sessionStorage if available
    const storedToken = sessionStorage.getItem("token");
    const storedUserRole = sessionStorage.getItem("userRole");

    if (storedToken && storedUserRole) {
      setUserRole(storedUserRole as "user" | "captain");
    }
  }, []);

  const saveAuthData = (data: AuthResponse) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userId", data.userId);
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email",data.email);
    sessionStorage.setItem("userRole", data.userRole);
  };

  const signup = async (
    firstName: string,
    lastName: string,
    userRole: "user" | "captain",
    email: string,
    password: string,
    vehicleType?: string
  ): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      //console.log(firstName , lastName , userRole , email , password , vehicleType)
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
        firstName,
        lastName,
        userRole,
        email,
        password,
        vehicleType,
      });

      saveAuthData(response.data)

      return response.data; // Assuming your API returns the user data in the response
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email: string, password: string): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        email,
        password,
      });
      saveAuthData(response.data);
      return response.data; // Assuming your API returns the user data in the response
    } catch (err: any) {
      setError(err.response?.data?.message || "Signin failed.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Handle submission
  const handleSubmit = async (isSignIn: boolean) => {
    if (isSignIn) {
      const response = await signin(email, password);
      if (response) {
        // Redirect based on user role
        const redirectPath = response.userRole === "captain" ? "/dashboard/captain" : "/dashboard/user";
        navigate(redirectPath);
      }
    } else {
      const response = await signup(firstName, lastName, userRole!, email, password, vehicleType);
      if (response) {
        // Redirect based on user role
        const redirectPath = response.userRole === "captain" ? "/dashboard/captain" : "/dashboard/user";
        navigate(redirectPath);
      }
    }
  };

  //handle user logout
  const logout = () =>{
    sessionStorage.clear(); //clear the session storage
    setUserRole(null)
    navigate('/signin')
  }

  return { 
    userRole, 
    setUserRole, 
    firstName, 
    setFirstName, 
    lastName, 
    setLastName, 
    email, 
    setEmail, 
    password, 
    setPassword, 
    vehicleType, 
    setVehicleType,
    loading, 
    error, 
    handleSubmit,
    logout
  };
};
