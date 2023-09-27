import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SET_LOGIN } from "../redux/features/auth/authSlice";
import { getLoginStatus } from "../services/authService";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      try {
        // Check if the user is logged in
        const isLoggedIn = await getLoginStatus();
        
        // Update the login status in Redux
        dispatch(SET_LOGIN(isLoggedIn));

        if (!isLoggedIn) {
          // Redirect to the specified path if the user is not logged in
          navigate(path);
          toast.info("Session expired, please login to continue.");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        // Handle any errors that occur during the check
        toast.error("An error occurred while checking your session.");
      }
    };

    // Call the function to check the login status
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);

  return null; // This hook doesn't render anything
};

export default useRedirectLoggedOutUser;
