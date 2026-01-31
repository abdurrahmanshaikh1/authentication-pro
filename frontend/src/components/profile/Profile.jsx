import { useSelector } from "react-redux";
import ProfileLoader from "./ProfileLoader";
import UserCard from "./UserCard";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return <ProfileLoader />;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100">
      <div className="w-full max-w-[280px] bg-white/90 backdrop-blur-xl shadow-xl rounded-xl p-3 border border-white/50 mt-10">
        <UserCard user={user} />
      </div>
    </div>
  );
};

export default Profile;
