import { User, Mail, Phone } from 'lucide-react';

const UserCard = ({ user }) => (
  <>
    {/* Compact Header */}
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-xl ring-4 ring-purple-100/50">
        <User className="w-10 h-10 text-white drop-shadow-md" />
      </div>
      <h1 className="text-3xl font-black bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900 bg-clip-text text-transparent tracking-tight">
        {user.name}
      </h1>
      <p className="text-slate-500 text-sm font-medium mt-1">Member Profile</p>
    </div>

    {/* Compact Info Cards */}
    <div className="space-y-4">
      {/* Email Card */}
      <div className="group flex items-center p-4 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl border border-blue-100/50 hover:border-blue-200/70 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:scale-105 transition-transform">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Email</p>
          <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
        </div>
      </div>

      {/* Mobile Card */}
      <div className="group flex items-center p-4 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-xl border border-emerald-100/50 hover:border-emerald-200/70 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl flex items-center justify-center mr-4 shadow-md group-hover:scale-105 transition-transform">
          <Phone className="w-6 h-6 text-emerald-600" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">Mobile</p>
          <p className="text-sm font-medium text-slate-900">{user.mobile}</p>
        </div>
      </div>

      {/* ID Card */}
      <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-200/50 backdrop-blur-sm">
        <p className="text-xs text-slate-500 font-mono font-medium uppercase tracking-wider">User ID</p>
        <p className="text-xs text-slate-700 font-mono bg-slate-100 px-3 py-1 rounded-full mt-1 truncate max-w-full">
          {user._id}
        </p>
      </div>
    </div>
  </>
);

export default UserCard;
