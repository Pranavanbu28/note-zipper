
import './App.css';
import './screens/Landingpage/LandingPage.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LandingPage from './screens/Landingpage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import { BrowserRouter, Link,Route } from "react-router-dom";
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import createNote from './screens/CreateNote/CreateNote';
import UpdateNotes from './screens/UpdateNotes/UpdateNotes';
import { useState } from 'react';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const App = () => {
    const[search, setSearch] = useState("")
    // console.log(search);
    return (

        <BrowserRouter>

        <Header setSearch = {setSearch}/>
        <main>
            <Route path="/" component={LandingPage} exact/>
            <Route path="/mynotes" component={()=> <MyNotes  search = {search}/>}/>
            <Route path="/login" component={LoginScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/createNote" component={createNote}/>
            <Route path="/note/:id" component={UpdateNotes}/>
            <Route path="/profile" component={ProfileScreen}/>
        </main>
        <Footer/>

        </BrowserRouter>
    )
}

export default App;
