import React from "react";
import { Toaster } from "react-hot-toast";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, onCreateTask }) => {
  return (
    <div>
      <Header onCreateTask={onCreateTask} />
      <main>{children}</main>
      <Footer />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "16px",
          },
          success: {
            duration: 3000,
            style: {
              background: "#10b981",
              color: "#fff",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#ef4444",
              color: "#fff",
            },
          },
        }}
      />
    </div>
  );
};

export default Layout;
