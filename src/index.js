'use strict';

module.exports = {
  register({ strapi }) {
    const userRoutes = strapi.plugins["users-permissions"].routes["content-api"].routes;
    const publicUserMiddleware = "global::user-data-public";

    const findUser = userRoutes.findIndex(
      (route) => route.handler === "user.find" && route.method === "GET"
    )

    const findOneUser = userRoutes.findIndex(
      (route) => route.handler === "user.findOne" && route.method === "GET"
    )

    function initializeRoute(routes, index) {
      routes[index].config.middlewares = routes[index].config.middlewares || [];
      routes[index].config.policies = routes[index].config.policies || [];
    }

    if (findUser) {
      initializeRoute(userRoutes, findUser);
      userRoutes[findUser].config.middlewares.push(publicUserMiddleware);
    }
    

    if (findOneUser) {
      initializeRoute(userRoutes, findOneUser);
      userRoutes[findOneUser].config.middlewares.push(publicUserMiddleware);
    }

    console.log(userRoutes[findOneUser], "userRoutes[findUser]")
  },


  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
