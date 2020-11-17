import React, { useState } from "react";
import styles from "./Repos.module.css";
import dateFormat from "dateformat";

const Repos = ({ reposData }) => {
  const [searchValue, setSearchValue] = useState("");

  if (!reposData || !reposData.length) {
    return <p>no result</p>;
  }
  const filterNames = ({ name }) => {
    return name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
  };
  const onchangeHandler = async (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={styles.repos}>
      <input
        placeholder="Find a repository..."
        type="text"
        onSearch={setSearchValue}
        value={searchValue}
        onChange={onchangeHandler}
        className={styles.repoSearch}
      />
      {!reposData.filter(filterNames).length && (
        <p className={styles.repoOwner}>
          {reposData[0].owner.login} doesn’t have any repositories that match
        </p>
      )}

      {reposData.filter(filterNames).map((repo) => {
        return (
          <div className={styles.singleRepo}>
            <p key={repo.id}>
              <a className={styles.repoUrl} href={repo.html_url}>
                {repo.name}
              </a>
            </p>
            <p>{repo.language}</p>
            <p className={styles.repoDate}>
              Updated on {dateFormat(repo.updated_at, "mmmm d")}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Repos;
