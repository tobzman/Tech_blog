const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  console.log('===============Running Post Routes=======================');
  try {
    const postData = await Post.findAll({
      include: [{ model:Comment}],
    
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', withAuth, async (req, res) => {
  try {
    const newData = {
      title: req.body.title,
      body: req.body.body
    };
    console.log(newData);
    const postData = await Post.update(newData, {
      where: {
        book_id: req.params.book_id
      },

    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/', withAuth, async (req, res) => {
  console.log('========Running Post Routes=========')
  try {
    const postData = await Post.findbypk(req.params.id, { include: [{ model: Comment }], });
    if(!readerData){res.status(404).json({})}
   } 
      
  

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
