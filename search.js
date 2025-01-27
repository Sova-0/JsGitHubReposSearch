export class Search {
  constructor(view, api) {
    this.view = view;
    this.api = api;

    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.searchRepos.bind(this), 400)
    );
  }

  searchRepos() {
    const searchValue = this.view.searchInput.value;
    if (searchValue) {
      this.clearRepos();
      this.usersRequest(searchValue);
    } else {
      this.clearRepos();
    }
  }

  clearRepos() {
    this.view.repoListResult.innerHTML = "";
  }

  async usersRequest(searchValue) {
    if(searchValue.trim() === ''){
      return
    }
    try {
      await this.api.searchRepos(searchValue).then((res) => {
        if (res.ok) {
          res.json().then((res) => {
            console.log(res);
            res.items.forEach((user) => {
              this.view.createRepo(user);
            });
          });
        }
      });
    } catch (e) {
      console.log("Error", + e);
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
