import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import OnlineRoutes from "./components/OnlineRoutes";
import PhotoDetails from "./components/PhotoDetails";
import Downloads from "./pages/Downloads";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Offline from "./pages/Offline";
import Photos from "./pages/Photos";
import Videos from "./pages/Videos";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<OnlineRoutes />}>
              <Route path="" index element={<Home />} />
              <Route path="photos" element={<Photos />} />
              <Route path="videos" element={<Videos />} />
            </Route>
            <Route path="photos/:photoId" element={<PhotoDetails />} />
            <Route path="videos/:videoId" element={<PhotoDetails />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="offline" element={<Offline />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
