import React, { useState, useContext } from "react";

import {
  Error,
  SpinnerLoader,
  Header,
  SideBar,
  Content,
  Notification,
} from "./components";

import { Context } from "./Context";

function App() {
  const [showSideBar, setShowSideBar] = useState(window.innerWidth > 1100);
  const {
    loading,
    error,
    data: { lastUpdate },
  } = useContext(Context);

  // Handle Sidebar
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

      <Notification lastUpdate={lastUpdate} />
    </div>
  );
}

export default App;
