import './App.css';

import { PostForm } from './components/PostForm.component';
import { Navbar } from './components/Navbar.component';
import { Feed } from './components/Feed.component';
import { SettingsProvider } from './contexts/Settings.context';
import { UserProvider } from './contexts/User.context';

function App() {
  return (
    <div className="App">
        <SettingsProvider>
          <UserProvider>
            <Navbar />
            <Feed />
            <PostForm />
          </UserProvider>
        </SettingsProvider>
    </div>
  );
}

export default App;
