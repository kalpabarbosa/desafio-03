import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `projeto ${Date.now()}`,
      url: 'http://github.com/kalpabarbosa',
      techs: ['Javascript', 'NodeJS', 'React', 'ReactJS', 'React Native']
    });

    const repository = response.data;

    if (repository) {
      setRepositories([...repositories, repository]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id)

    console.log(response.status)
    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex, 1);

      setRepositories([...repositories]);
    }
  }

  const listItems = repositories.map(project => {
    return <li key={project.id}>
      {project.title}
      <button onClick={() => handleRemoveRepository(project.id)}>
        Remover
      </button>
    </li>
  });

  return (
    <div>
      <ul data-testid="repository-list">
        {listItems}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
