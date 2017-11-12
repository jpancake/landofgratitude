/* globals Post, User */
const controller = require('./../../controllers/posts_controller')
const { users, posts, populatePosts, populateUsers, mongoose } = require('./../test_helper_jest')

xdescribe('Post Controller', () => {
	it('should exist', () => expect(controller).toExist)
	describe('addPost', () => {
		beforeAll(async () => {
			await populateUsers()
			await populatePosts()
		})
		afterAll(() => mongoose.disconnect())
		const testPost = {
			text: 'Just Testing!',
			creator: users[0]._id
		}
		it('should exist', () => expect(controller.addPost).toExist)
		it('should save the added post to the database', async () => {
			await controller.addPost(testPost)
			const post = await Post.findOne({ text: testPost.text })
			expect(post.text).toEqual(testPost.text)
			expect(post.creator).toEqual(testPost.creator)
		})
		it('should return the added post', async () => {
			const post = await controller.addPost(testPost)
			expect(post.text).toEqual(testPost.text)
			expect(post.creator).toEqual(testPost.creator)
		})
		it('should throw error if missing fields', async () => {
			try {
				await controller.addPost({ text: 'hello' })
			} catch (e) {
				expect(e.toString()).toContain('Path `creator` is required')
			}
		})
	})
	describe('fetchPost', () => {
		it('should exist', () => expect(controller.fetchPost).toExist)
		it('should return the post with given ID', async () => {
			const post = await controller.fetchPost(posts[0]._id)
			expect(post._id).toEqual(posts[0]._id)
			expect(post.text).toEqual(posts[0].text)
		})
		it('should throw error if invalid ID', async () => {
			try {
				await controller.fetchPost('2984892abkc')
			} catch (e) {
				expect(e.toString()).toEqual('Error: Invalid ID')
			}
		})
		it('should throw error if no post is found', async () => {
			try {
				await controller.fetchPost('592666d545a11d2110137639')
			} catch (e) {
				expect(e.toString()).toContain('Post not found')
			}
		})
	})
	describe('removePost', async () => {
		beforeEach(async () => {
			await populatePosts()
		})
		afterAll(() => mongoose.disconnect())
		it('should exist', () => expect(controller.removePost).toExist)
		it('should remove the post with given ID', async () => {
			try {
				await controller.removePost({
					_id: posts[0]._id,
					creator: users[0]._id
				})
				const post = await Post.findById(posts[0]._id)
				expect(post).toEqual(null)
			} catch (e) {
				throw new Error(e)
			}
		})
		it('should throw error if invalid ID', async () => {
			try {
				await controller.removePost('2984892abkc')
			} catch (e) {
				expect(e.toString()).toEqual('Error: Invalid ID')
			}
		})
		it('should throw error if no post is found', async () => {
			try {
				await controller.removePost({
					_id: '59348697c7a835639802288a'
				})
			} catch (e) {
				expect(e.toString()).toContain('Post not found')
			}
		})
	})
	describe('likePost', () => {
		it('should exist', () => expect(controller.likePost).toExist)
		it('should like the selected post', async () => {
			try {
				const post = await controller.likePost(posts[0]._id, users[1]._id)
				expect(post.likes[0]).toEqual(users[1]._id)
				const savedPost = await Post.findById(posts[0]._id)
				expect(savedPost.likes[0]).toEqual(users[1]._id)
			} catch (e) {
				throw new Error(e)
			}
		})
		it('should save liked post to the user document', async () => {
			try {
				await controller.likePost(posts[1]._id, users[2]._id)
				const user = await User.findById(users[2]._id)
				expect(user.likedPosts[0]).toEqual(posts[1]._id)
			} catch (e) {
				throw new Error(e)
			}
		})
		it('should throw error if invalid ID', async () => {
			try {
				await controller.likePost('2984892abkc', users[1]._id)
			} catch (e) {
				expect(e.toString()).toEqual('Error: Invalid ID')
			}
		})
		it('should throw error if no post is found', async () => {
			try {
				await controller.likePost('59348697c7a835639802288a', users[0]._id)
			} catch (e) {
				expect(e.toString()).toContain('Post not found')
			}
		})
	})
})
