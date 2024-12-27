module.exports = {
    publishers: [
      {
        name: '@electron-forge/publisher-github',
        config: {
          repository: {
            owner: 'nimash79',
            name: 'general-information-test'
          },
          prerelease: false,
          draft: true
        }
      }
    ]
  }