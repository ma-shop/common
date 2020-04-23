import fs from 'fs'

import globby from 'globby'
import { normalize } from '@ma-shop/utils'

// @todo make this a global util at some point
const map = (obj, callback) => Promise.all([].concat(obj).map(callback))


export class Files {
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
        return normalize(`
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
    const banner = normalize(_).split('\n').join('      // !!! ')

    if (!banner) return ''

    return `${normalize(`
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
