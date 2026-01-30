import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ProfileLoader from "./ProfileLoader";
import UserCard from "./UserCard";
import { removeUser } from "../../features/AuthSlice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      // If user is not in Redux, redirect to login
      dispatch(removeUser());
      navigate("/login");
    }
  }, [user, dispatch, navigate]);

  if (!user) return <ProfileLoader />;

  return (
    <div className="flex justify-center items-start min-h-screen">
  <div className="w-full max-w-[280px] bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-3 border border-white/50">
    <UserCard user={user} />
  </div>
</div>

  );
};

export default Profile;
