import React from "react";
import { Container } from "@material-ui/core";
import styles from "./Profile.module.css";

/**
 * Props
 * @param {login,followers,avart_url,bio} arg are the desctructed props coming from the Api reponse
 */
const Profile = ({
  githubUser: { login, followers, avatar_url, bio },
  apiError,
}) => {
  return (
    <div>
      {login ? (
        <Container>
          <img alt="" src={avatar_url} className={styles.avatar} />
          <h1 className={styles.name}>{login}</h1>
          <p className={styles.bio}>{bio}</p>
          <p className={styles.followers}>Number of followers:{followers}</p>
        </Container>
      ) : (
        <p className={styles.error}>{apiError}</p>
      )}
    </div>
  );
};
export default Profile;
