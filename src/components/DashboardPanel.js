import React, { useContext } from "react";
import { AuthContext, AuthProvider } from "../context";

export default function DashboardPanel() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome, {user.displayName}!</h1>
      <div>
        <h4>Your collections:</h4>

        {/* collection titles */}
        <div style={{ display: "flex" }}>
          <h4>name</h4>
          <h4># of entries</h4>
          <h4># of editors</h4>
        </div>

        {/* collection data */}
        <div>
          <p>Nike vefverslun</p>
          <p>25</p>
          <p>3</p>
        </div>
      </div>
    </div>
  );
}
