import React from "react";
import { logout } from "../../util/logout";

function Logout() {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <button
        id="login-button"
        onClick={logout}
        className={`flex items-center justify-center min-w-[300px] min-h-[50px] px-4 py-3 text-lg font-semibold text-white bg-green-400 rounded-lg shadow-md hover:bg-green-500 focus:outline-none`}
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;
