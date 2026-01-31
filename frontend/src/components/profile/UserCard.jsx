import { User, Mail, Phone } from "lucide-react";

const UserCard = ({ user }) => (
  <>
    {/* User Avatar & Name */}
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg ring-2 ring-purple-100/70">
        <User className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent">
        {user.name}
      </h1>
      <p className="text-slate-500 text-xs mt-1">Member</p>
    </div>

    {/* User Email */}
    <div className="space-y-2 p-2">
      <div className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 rounded-lg">
        <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
        <div className="min-w-0 flex-1 text-xs">
          <p className="text-slate-500 font-medium uppercase tracking-wider text-[10px] mb-0.5">Email</p>
          <p className="text-slate-800 font-medium truncate text-sm">{user.email}</p>
        </div>
      </div>

      {/* User Mobile */}
      <div className="flex items-center gap-3 p-2.5 bg-gradient-to-r from-emerald-50/80 to-green-50/80 rounded-lg">
        <Phone className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <div className="min-w-0 flex-1 text-xs">
          <p className="text-slate-500 font-medium uppercase tracking-wider text-[10px] mb-0.5">Mobile</p>
          <p className="text-slate-800 font-medium text-sm">{user.mobile}</p>
        </div>
      </div>

      {/* User ID */}
      <div className="p-2.5 bg-slate-50/80 rounded-lg">
        <p className="text-slate-500 text-[10px] font-medium uppercase tracking-wider mb-1">User ID</p>
        <p className="text-slate-700 text-xs font-mono bg-slate-100 px-2 py-0.5 rounded-full truncate text-[11px]">
          {user._id || user.id}
        </p>
      </div>
    </div>
  </>
);

export default UserCard;
