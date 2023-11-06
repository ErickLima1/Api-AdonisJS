'use strict'
const Tweet = use('App/Models/Tweet');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {
  /**
   * Show a list of all tweets.
   * GET tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index () {
    const tweets = await Tweet.query().with('user').fetch();

    return tweets;

  }

  // /**
  //  * Render a form to be used for creating a new tweet.
  //  * GET tweets/create
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  * @param {View} ctx.view
  //  */
  // async create ({ request, response, view }) {
  // }

  /**
   * Create/save a new tweet.
   * POST tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    try {
      const data = request.only(['content']);
      const tweet = await Tweet.create({ user_id: auth.user.id, ...data });
  
      return tweet;

    } catch (error) {
      return response.status(500).json({ error: 'Ocorreu um erro ao criar o tweet.' });
    };
  }
  
  /**
   * Display a single tweet.
   * GET tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, response }) {
    try {
      const tweet = await Tweet.findOrFail(params.id);
  
      return tweet;
      
    } catch(error) {
      return response.status(404).json({error: 'Tweet Não Encontrado'});
    };
  }

  // /**
  //  * Render a form to update an existing tweet.
  //  * GET tweets/:id/edit
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  * @param {View} ctx.view
  //  */
  // async edit ({ params, request, response, view }) {
  // }

  // /**
  //  * Update tweet details.
  //  * PUT or PATCH tweets/:id
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  */
  // async update ({ params, request, response }) {

  // }

  /**
   * Delete a tweet with id.
   * DELETE tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, auth, response }) {
    const tweet = await Tweet.findOrFail(params.id);

    if(tweet.user_id !== auth.user.id) {
      return response.status(401).json({ error: 'Você Não Esta Autorizado.' });
    };

    await tweet.delete();

  }
}

module.exports = TweetController
