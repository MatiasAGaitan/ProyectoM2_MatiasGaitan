
const {getServicePosts} = require('../Services/servicePosts')

const getPost = async (req,res) =>{
    try {
        const posts = await getServicePosts()
            res.json(posts)
    } catch (error) {
        next(error)}
}

module.exports = {
    getPost
}