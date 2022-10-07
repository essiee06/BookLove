import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import BookClubs from "./Pages/BookClubs/BookClubs";
import BrowseClubs from "./Pages/BrowseClubs/BrowseClubs";
import CreateClubs from "./Pages/CreateClub/CreateClubs";
import LoginForm from "./Pages/SignInUp/LoginForm";
import ForgotPassword from "./Pages/ForgotPassword/forgotpassword";
import EditProfile from "./Pages/EditProfile/EditProfile";
import BookClubPageNonMembers from "./Pages/BookClubPage/BookClubPageNonMembers/BookClubPageNonMembers";
import BookClubPageMembers from "./Pages/BookClubPage/BookClubPageMembers/BookClubPageMembers.module.css/BookClubPageMembers";

function App() {
  const [setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm setIsAuth={setIsAuth} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mybookclubs" element={<BookClubs />} />
        <Route path="/browse" element={<BrowseClubs />} />
        <Route path="/create" element={<CreateClubs />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* <Route path="/bookclubname" element={<BookClubPageNonMembers />} /> */}
        <Route path="/bookclubname/members" element={<BookClubPageMembers />} />
        <Route path='/:slug' element={<BookClubPageNonMembers />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword setIsAuth={setIsAuth} />}
        />
      </Routes>
    </BrowserRouter>
    // <React.Fragment>
    //   <BrowserRouter>
    //     <MainPage />
    //   </BrowserRouter>
    // </React.Fragment>
  );
}

export default App;
