import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  
  const fetchProfile = async () => {
    try {
      console.log("Fetching profile from:", `${client.HTTP_SERVER}/api/users/profile`);
      const currentUser = await client.profile();
      console.log("Profile fetched:", currentUser);
      dispatch(setCurrentUser(currentUser));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(" Profile fetch failed:", err);
      console.error(" Response:", err.response?.data);
      console.error(" Status:", err.response?.status); // for debugging
    }
    setPending(false);
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (!pending) {
    return children;
  }
}