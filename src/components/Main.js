import React, { useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import { Container } from "@material-ui/core";
import styles from "./Main.module.css";
import Repos from "./Repos";

const Main = () => {
  const [username, setUsername] = useState("");
  const [githubUser, setGithubUser] = useState({});
  const [apiError, setApiError] = useState("");
  const [reposData, setReposData] = useState({});

  /**
   * the submit function with the api axios calls for the all data necessary to work with the project
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    const repos = await axios
      .all([
        axios.get(`https://api.github.com/users/${username}`),
        axios.get(`https://api.github.com/users/${username}/repos`),
      ])
      .then(
        axios.spread((data1, data2) => {
          const {
            data: { login, bio, avatar_url, followers },
          } = data1;
          setGithubUser({ login, bio, avatar_url, followers });
          const reposDataResponse = data2.data;
          setReposData(reposDataResponse);
        })
      )
      .catch((error) => {
        setApiError(error.response.statusText);
      });
  };
  const onchangeHandler = async (e) => {
    setUsername(e.target.value);
  };
  return (
    <div>
      <Container>
        <h1 className={styles.headline}>GitHub Repositories Search App</h1>
        <input
          placeholder="Search or jump to..."
          type="text"
          value={username}
          onChange={onchangeHandler}
          className={styles.usernameInput}
        />
        <button
          type="submit"
          onClick={submitHandler}
          className={styles.btnSearch}
        >
          Search
        </button>
        <Profile githubUser={githubUser} apiError={apiError} />
        <Repos reposData={reposData} apiError={apiError} />
      </Container>
    </div>
  );
};
export default Main;
