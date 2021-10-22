module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-layout/gatsby-browser.js'),
      options: {"plugins":[],"component":"/Users/analyst/Documents/DappDev/solarbeam/Github-Working-Folder/GodSaveTheLPs/Docs/src/templates/docs.js"},
    },{
      plugin: require('../node_modules/gatsby-plugin-mdx/gatsby-browser.js'),
      options: {"plugins":[],"gatsbyRemarkPlugins":[{"resolve":"gatsby-remark-images","options":{"maxWidth":1035,"sizeByPixelDensity":true}},{"resolve":"gatsby-remark-copy-linked-files"}],"extensions":[".mdx",".md"],"defaultLayouts":{},"lessBabel":false,"remarkPlugins":[],"rehypePlugins":[],"mediaTypes":["text/markdown","text/x-markdown"],"root":"/Users/analyst/Documents/DappDev/solarbeam/Github-Working-Folder/GodSaveTheLPs/Docs"},
    },{
      plugin: require('../node_modules/gatsby-plugin-gtag/gatsby-browser.js'),
      options: {"plugins":[],"trackingId":null,"head":true,"anonymize":false},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
