const sass = require('sass')
const variables = require('./variables.json')

module.exports = {
  'equipment-tags()': function (args) {
    const equipmentTags = Object.keys(variables.equipmentTags).map(
      (tag) => new sass.SassString(tag)
    )
    return new sass.SassList(equipmentTags)
  },
}
