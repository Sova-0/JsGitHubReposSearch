import { Search } from "./search.js";
import { View } from "./view.js";
import { Api } from "./api.js";

const api = new Api();

const app = new Search(new View(api), api);
