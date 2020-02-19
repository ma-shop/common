import fs from 'fs'

import globby from 'globby'

// @todo make this a global util at some point
const map = (obj, callback) => Promise.all([].concat(obj).map(callback))


export class Files {
  /// @name normalize
  /// @author Tyler Benton
  /// @description
  /// Removes trailing/leading blank lines. Removes extra whitespace before all the lines that
  /// are passed without affecting the formatting of the passes string. Then removes
  /// all whitespace at the end of each line.
  /// @arg {string, array} content - The content you want to be normalized
  /// @returns {string} - The normalized string
  /// @example
  /// let content = `
  ///
  ///     Lorem ipsum dolor sit amet,
  ///     consectetur adipisicing elit.
  ///
  /// ` aka "\n\n    Lorem ipsum dolor sit amet,\n     consectetur adipisicing elit.\n\n"
  ///
  /// normalize(content) // "Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit."
  static normalize (str) {
    // this allows arrays and strings to be passed
    const content = typeof str === 'string' ? str.split('\n') : str
    // remove blank lines from the start
    while (content.length && !content[0].trim().length) content.shift()
    // remove blank lines from the end
    while (content.length && !content[content.length - 1].trim().length) content.pop()
    // get the indent of the string
    const indentNumber = content
      .join('\n')
      // gets the extra whitespace at the beginning of the line and returns a map of the spaces
      .match(/^\s*/gm)
      // sorts the spaces array from smallest to largest and then checks
      // returns the length of the first item in the array
      .sort((a, b) => a.length - b.length)[0].length

    return content
      // remove extra whitespace from the beginning of each line
      .map((line) => line.slice(indentNumber))
      .join('\n') // converts content to string
      .replace(/[^\S\r\n]+$/gm, '') // removes all trailing white spaces from each line
  }

  static configs = {
    exports: {
      banner: 'This file is generated do not modify it manually because it will be overwritten',
      exts: [ 'js', 'mjs', 'jsx' ],
      filter (file) {
        return !file.includes('.') || (this.isFile(file) && !this.isIndexFile(file))
      },
      pattern: '*',
      indexFile: 'index.mjs',
      content (files) {
        return this.format(files, (file) => `export * from './${file}'`)
      },
    },
    image: {
      pattern: '**/*.{jpg,png,gif,svg,webp}',
      // the pattern handles the filtering of the files
      filter: Boolean,
      indexFile: 'index.js',
      content (files) {
        return Files.normalize(`
          // unfortuantly you have to require image files in order for them to work
          // with react-native and using global-require is be best way to handle it
          /* eslint-disable global-require */
          module.exports = {
            ${this.format(files, (file) => `'${file}': require('./${file}'),`, 12)}
          }
        `)
      },
    },
    json: {
      exts: [ 'json' ],
      banner: '',
      indexFiles: 'index.json',
    },
  }

  static banner (_ = '') {
    const banner = Files.normalize(_).split('\n').join('      // !!! ')

    if (!banner) return ''

    return `${Files.normalize(`
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // !!! ${banner}
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    `)}\n\n`
  }

  static output (file, contents) {
    const str = [].concat(contents).join('\n')
    return new Promise((resolve, reject) => {
      // don't output the file because nothings in it
      if (!file || !str.replace(/[\n\s]+/g, '')) {
        resolve()
        return
      }

      fs.writeFile(file, `${str}\n`, (err) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }

  constructor (options = {}) {
    Object.assign(this.options, options)
  }

  options = { ...Files.configs.exports }

  configs = Files.configs

  format (obj, callback, indent = 0) {
    return obj.map((str, i) => callback(this.stripExt(str), i, str)).join(`\n${' '.repeat(indent)}`)
  }

  isIndexFile = (str) => {
    return new RegExp(`.*index(\\.(story|test))?\\.(?:${this.options.exts.join('|')})$`).test(str)
  }

  isFile = (str) => new RegExp(`\\.(?:${this.options.exts.join('|')})$`).test(str)

  stripExt = (str) => {
    const regex = new RegExp(`(?:\\.(?:story|test))?\\.(?:${this.options.exts.join('|')})+$`)

    return str.replace(regex, '')
  }

  async write (folderPatterns, opts = {}) {
    const options = {
      ...this.options,
      dest: ({ cwd, indexFile }) => `${cwd}/${indexFile}`,
      ...(typeof opts === 'function' ? { content: opts } : opts),
    }

    const folderSets = await map(folderPatterns, (str) => {
      return globby(str, { expandDirectories: false, onlyDirectories: true })
    })

    return map(folderSets, (folders) => {
      return map(folders, async (cwd) => {
        const files = (await globby(options.pattern, { cwd, onlyFiles: false }))
          .sort()
          .filter((...args) => options.filter.call(this, ...args))

        return Files.output(
          options.dest({ ...options, cwd }),
          `${Files.banner(options.banner)}${options.content.call(this, files, cwd)}`,
        )
      })
    })
  }
}


// const files = new Files()



// files.write([
//   // components
//   'app/components',
//   'app/components/layout',
//   'app/components/product',
//   'app/components/store',
//   'app/components/list',
//   'app/components/form',
//   'app/components/form/utils',
//   'app/components/form/address-fields',
//   'app/components/modules',
//
//   // screen components, queries, utils, and routes
//   'app/screens/*/components',
//   'app/screens/*/queries',
//   'app/screens/*/utils',
//   'app/screens/*/routes',
//
//   // story utils
//   'stories/utils',
//   'test-ui/utils',
//
//   // screens
//   'app/screens',
// ])
//
// files.write('app/resources/images', files.configs.image)
//
//
// files.write('app/components/form/text-inputs', (obj) => {
//   return files.format(obj, (file) => `import './${file}'`)
// })
//
// // screens
// files.write('app/screens/*', {
//   filter: (file) => {
//     return files.isFile(file) && !files.isIndexFile(file) && !/queries|utils/.test(file)
//   },
// })
//
//
// // story screens
// files.write('stories/screens', {
//   indexFile: 'index.story.mjs',
//   content (folders) {
//     const imports = files.format(folders, (folder) => {
//       return `import ${folder.toLowerCase()} from './${folder}/index.story'`
//     })
//     const functions = files.format(folders, (folder) => `${folder.toLowerCase()}()`)
//
//     return [
//       imports,
//       '',
//       '',
//       functions,
//     ].join('\n')
//   },
// })

