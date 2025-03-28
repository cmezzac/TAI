import React from 'react';
import {Routes, Route } from "react-router";

import Home from "../pages/Home.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Settings from "../pages/Settings.tsx";


function Root() {
    return (
        <Routes>
            <Route index element={Home}/>
            <Route path="dashboard" element={Dashboard}/>
            <Route path="lecture/:luid" element={<></>}/>
            <Route path="settings">
                <Route index element={Settings}/>
                <Route path="account"/>
                <Route path=""/>
            </Route>
        </Routes>
    );
}

export default Root;