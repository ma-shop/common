const fs = require('fs').promises


async function run () {
  const rootDir = process.cwd().split('node_modules')[0]
  const basePath = `${rootDir}/node_modules/@ma-shop`
  const packagesPath = `${basePath}/utils/dist/packages.js`
  const file = `${await fs.readFile(packagesPath).catch(() => '')}`
  const packages = await fs.readdir(basePath).catch(() => [])

  if (file && packages.length) {
    const splitter = 'try {\n'
    const filteredPackages = file
      .split(splitter)
      .filter((str) => !str.includes('@ma-shop') || packages.find((pkg) => str.includes(pkg)))
      .join(splitter)

    if (filteredPackages) {
      await fs.writeFile(packagesPath, filteredPackages)
    }
  }
}

run()
