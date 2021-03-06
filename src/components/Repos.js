import React, { useState } from "react";
import styles from "./Repos.module.css";
import dateFormat from "dateformat";

const Repos = ({ reposData, apiError }) => {
  const [searchValue, setSearchValue] = useState("");

  /*
   * checking if the data is available or not
   */
  if (!reposData || !reposData.length) {
    return <p className={styles.error}>{apiError}</p>;
  }

  /**
   * the filter function
   * @param {name} arg A name to filter from the list.
   */
  const filterRepos = ({ name }) => {
    // console.log(name);
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
        // onSearch={setSearchValue}
        value={searchValue}
        onChange={onchangeHandler}
        className={styles.repoSearch}
      />
      {!reposData.filter(filterRepos).length && (
        <p className={styles.repoOwner}>
          {reposData[0].owner.login} doesn’t have any repositories that match
        </p>
      )}

      {reposData.filter(filterRepos).map((repo) => {
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
