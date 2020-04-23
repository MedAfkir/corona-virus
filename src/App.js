import React, { useState, useContext } from "react";

import Error from "./components/Error";
import SpinnerLoader from "./components/Loader";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Content from "./components/Content/Content";

import { Context } from "./Context";

function App() {
  const [showSideBar, setShowSideBar] = useState(window.innerWidth > 1100);
  const { loading, error } = useContext(Context);

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  if (loading) {
    return <SpinnerLoader text="Loading data..." />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div>
      <Header handleSideBar={handleSideBar} />

      <SideBar showSideBar={showSideBar} handleSideBar={handleSideBar} />

      <Content showSideBar={showSideBar} />
    </div>
  );
}

export default App;
