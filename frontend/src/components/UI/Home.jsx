import React from "react";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Table from "./Table";
import Summary from "./Summary";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="row g-4 m-4 d-flex align-items-stretch">
          <div className="col-lg-8 d-flex flex-column">
            <div className="card shadow-sm mb-4 flex-grow-1">
              <div className="card-body">
                <Dashboard />
              </div>
            </div>
            <div className="card shadow-sm flex-grow-1">
              <div className="card-body">
                <Table />
              </div>
            </div>
          </div>
          <div className="col-lg-4 d-flex flex-column">
            <div className="card shadow-sm flex-grow-1">
              <div className="card-body h-100">
                <Summary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
