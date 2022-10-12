import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
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
import { MissingRoute } from "./MissingPage/MissingPage";

import Splash from "./Components/Splash/Splash";
import EditClub from "./Components/EditClub/EditClub";
import CreateNewPost from "./Components/CreateNewPost/CreateNewPost";

function App() {
  const [setIsAuth] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm setIsAuth={setIsAuth} />} />
        <Route path="/home" element={<Home />} />

        <Route path="/splash" element={<Splash />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/mybookclubs" element={<BookClubs />} />
        <Route path="/browse" element={<BrowseClubs />} />
        <Route path="/create" element={<CreateClubs />} />
        <Route path="/clubpage/edit" element={<EditClub />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* <Route path="/bookclubname" element={<BookClubPageNonMembers />} /> */}
        <Route path="/bookclubname/members" element={<BookClubPageMembers />} />
        <Route
          path="/:bookClubSlug"
          element={<BookClubPageNonMembers setIsAuth={setIsAuth} />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword setIsAuth={setIsAuth} />}
        />
        <Route path="*" element={<MissingRoute/>} />
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
