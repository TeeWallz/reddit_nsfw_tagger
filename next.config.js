const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? '/reddit_nsfw_tagger/' : ''
}