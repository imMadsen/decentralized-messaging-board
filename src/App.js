import './App.css';

import { PostForm } from './components/PostForm.component';
import { Navbar } from './components/Navbar.component';
import { Feed } from './components/Feed.component';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Feed />
      <PostForm />
    </div>
  );
}

export default App;
