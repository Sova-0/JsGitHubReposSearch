const URL = "https://api.github.com";

export class Api {
  constructor() {}

  async searchRepos(value) {
    return await fetch(
      `${URL}/search/repositories?q=${value}&per_page=5`
    );
  }
}
