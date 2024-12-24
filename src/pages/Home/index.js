import { useState } from "react";
import { Header } from "../../components/Header";
import  Logo  from "../../assets/logo.png";
import  ItemList  from "../../components/ItemList"

import './style.css'

function App() {

  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)

  const handleGetData = async() =>{
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if(newUser.login){
      const {avatar_url, name, bio, login} = newUser;
      setCurrentUser({avatar_url, name, bio, login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos)
      }
    }
  }



  return (
    <div className="App">
      <Header />
      <div className="container">
        <img src={ Logo } alt=" GitHub Logo " className="logo"/>
        <div className="info">
          <div>
            <div className="inputWrap">
              <input className="input" value={user}
               onChange={event => setUser(event.target.value)}
               name="usuario" placeholder="@username" />
              <button className="btn" onClick={handleGetData}>Buscar</button>
            </div>
            {currentUser?.login ?(<>
              <div className="profile">
              <img src={currentUser.avatar_url} className="profileImg" alt="Profile Pic" />
              <div>
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
            </> 
            ): null}
           
          </div>

          {repos?.length ?(
            
            <div className="repoList">
            <h4>Repositórios</h4>
            <div className="list">
            {repos.map(repo => (
              <ItemList  title={repo.name} description={repo.description} />
            ))};
            </div>
          </div>
          ): null}
        </div>
      </div>
    </div>
  );
}

export default App;
