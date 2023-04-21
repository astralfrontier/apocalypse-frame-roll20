const sass = require('sass')
const variables = require('./variables.json')
const { flatten, keys, map, uniq } = require('ramda')

// tags: string[] => tags: SassString[]
const tagsToSassStrings = map((tag) => new sass.SassString(tag))

// object key => tags: string[]
const tagKeyToTags = (tagKey) => keys(variables[tagKey])

module.exports = {
  'af-tags()': function (_args) {
    // Update this list with every object in variables.json that holds tags
    const tagInventory = ['rangeTags', 'systemTags', 'armamentTags']
    const tagsInInventory = uniq(flatten(map(tagKeyToTags, tagInventory)))
    const tagsAsSassStrings = tagsToSassStrings(tagsInInventory)

    return new sass.SassList(tagsAsSassStrings)
  },
}
