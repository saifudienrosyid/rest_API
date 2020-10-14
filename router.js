import express from 'express';
import Homework from './database.js';
const router = express.Router();
router.post('/homeworks', async (req, res)=>{
    try {
        const {course,title, due_date, status}= req.body;

        const homework= new Homework({
            course,
            title,
            due_date,
            status
        });

        const createdHomework = await homework.save();

        res.status(201).json(createdHomework)

    } catch (err) {
        //console.log(err)
        res.status(500).json({error: 'Database creation failed'})
    }
})

//desc GEt all homework
//@route get //api/homeworks

router.get('/homeworks', async(req,res)=>{
    const homeworks= await Homework.find({})

    if (homeworks) {
        res.json(homeworks)
    } else {
        res.status(404).json({
            message:'Homework not found'
        })
    }
})

//desc GEt a homework
//@route get //api/homeworks/:id

router.get('/homeworks/:id', async(req,res)=>{
    const homework=await Homework.findById(req.params.id)

    if (homework) {
        res.json(homework)
    } else{
        res.status(404).json({
            message: ' Homework not found'
        })
    }
})

// router.put('/homeworks/:id', (req,res)=>{
//     const {course, title, due_date, status}= req.body;

//     const homework = await Homework.findById(req.params.id);
//     // const homework = await Homework.findById(req.params.id)

//     if (homework) {
//         homework.course = course
//         homework.title=title
//         homework.due_date=title
//         homework.status=title

//         const updateHomework = await homework.save()

//         res.json(updateHomework)
//     } else {
//         res.status(404).json({
//                 message: 'Homework not found'
//         })
//     }
// })
router.put('/homeworks/:id', async (req, res) => {
    const {
      course,
      title,
      due_date,
      status,
    } = req.body;
  
    const homework = await Homework.findById(req.params.id);
  
    if (homework) {
      homework.course = course;
      homework.title = title;
      homework.due_date = due_date;
      homework.status = status;
  
      const updateHomework = await homework.save();
      res.json(updateHomework)
    } else {
      res.status(404).json({
        message: 'homework not found'
      })
    }
  })


  //@desc Delete a homework
  //route Delete /api/homework/:id
  router.delete('/homeworks/:id', async (req,res)=>{
      const homework = await Homework.findById(req.params.id)

      if (homework) {
          await homework.remove()
          res.json({
              message:'Data remove'
          })
      } else {
          res.status(404).json({
            message: 'Homework not found'
          })
      }
  })

  //@desc Delete all homework
  //route Delete /api/homework/delete
  router.delete('/homeworks', async (req,res)=>{
    //   Homework.remove()
    const homework = Homework

    if (homework) {
        await homework.remove()
        res.json({
            message:'All Data remove'
        })
    } else {
        res.status(404).json({
          message: 'Homework not found'
        })
    }
})
export default router;