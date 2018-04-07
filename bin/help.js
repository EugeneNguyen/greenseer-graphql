const helpers = {
  all: `greenseer-graphql is a auto generate code for graphql express.

init          init a project
env list      list all env
`,
}

const helper = (topic) => {
  console.log(helpers[topic]);
}

module.exports = {
  helper
}