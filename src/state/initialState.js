import { newEndpoint } from "../core";

const initialState = {
  port: 8080,
  active: 0,
  endpoints: [
    newEndpoint({ endpoint: "/resources", type: "database" }),
    newEndpoint({ endpoint: "/labels", type: "json" }),
    newEndpoint({ endpoint: "/files", type: "file" }),
  ],
  database: {},
};

export default initialState;
