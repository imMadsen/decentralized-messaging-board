import './App.css';

import { PostForm } from './components/PostForm.component';
import { Navbar } from './components/Navbar.component';
import { Feed } from './components/Feed.component';
import { useEffect } from 'react';
import { createAnonymousUser, user } from './user';
import { UserProvider } from './contexts/User.context';

function App() {
  // Create an anonymous user if there is none
  useEffect(() => {
      if (!user.is)
        createAnonymousUser()
  }, [])

  return (
    <div className="App">
      <UserProvider>
        <Navbar />
        <Feed />
        <PostForm />
      </UserProvider>
    </div>
  );
}

export default App;
