
export class View {
  constructor(api) {
    this.app = document.querySelector(".app");
    this.api = api;

    this.title = this.createElement("h1", "title");
    this.title.textContent = "GitHub Search Repos";

    this.searchLine = this.createElement("div", "search-line");
    this.searchInput = this.createElement("input", "search-input");
    this.searchInput.placeholder = 'Введите запрос';
    this.searchLine.append(this.searchInput);

    this.main = this.createElement("div", "main");
    this.repoListResult = this.createElement("ul", "result");

    this.reposListAdded = this.createElement('ul', 'repo-list');

    this.main.append(this.repoListResult);

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.app.append(this.main);
    this.app.append(this.reposListAdded);
  }
  createElement(elementTag, elementClass) {
    const element = document.createElement(elementTag);
    if (elementClass) {
      element.classList.add(elementClass);
    }
    return element;
  }

  createRepo(repoData) {
    const repoElement = this.createElement("li", "repo-element");
    repoElement.innerHTML = `<span class="repo-element-name">${repoData.name}</span>`;
    repoElement.addEventListener('click', () => this.addRepo(repoData));

    this.repoListResult.append(repoElement);
  }

  addRepo(repoObj) {
    const repoElement = this.createElement('li', 'repo-added');
    const button = this.createElement('button', 'button-del');
    button.addEventListener('click', ()=> {
      repoElement.remove();
    })
    repoElement.innerHTML = 
      `
        <div class="repo-info">Name: ${repoObj.name}</div>
        <div class="repo-info">Owner: ${repoObj.owner.login}</div>
        <div class="repo-info">Stars: ${repoObj.stargazers_count}</div>
      `;
    repoElement.append(button);
    this.reposListAdded.append(repoElement);
    this.repoListResult.innerHTML = '';
    this.searchInput.value = '';
    
  }
}
