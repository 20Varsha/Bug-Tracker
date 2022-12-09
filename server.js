const express = require('express');


const Joi = require('joi');

const app = express();

app.use(express.json());

const bugs = [
    { id: 1, title: "toast", description: "toast message incorrect", projectId: "11234", reporterId: "87586", roleId: "23412", assigneeId: "49276", followerId: "98734", classificationId: "86347", reproduceId: "57321", severityId: "69871", moduleId: "86315", tagId: "63534", documentId: "47352", dueDate: "63428" },
    { id: 2, title: "login error", description: "Unable to log in to the system", projectId: "75434", reporterId: "83522", roleId: "27312", assigneeId: "79276", followerId: "78734", classificationId: "58347", reproduceId: "67321", severityId: "39871", moduleId: "26315", tagId: "43534", documentId: "87352", dueDate: "73428" },
    { id: 3, title: "validation", description: "validation incorrect", projectId: "76234", reporterId: "96586", roleId: "98412", assigneeId: "49266", followerId: "98743", classificationId: "86344", reproduceId: "57362", severityId: "69873", moduleId: "75315", tagId: "23534", documentId: "37352", dueDate: "53428" },
    { id: 4, title: "responsive issue", description: "page not responsive", projectId: "45234", reporterId: "88586", roleId: "43812", assigneeId: "75328", followerId: "36434", classificationId: "96512", reproduceId: "62452", severityId: "75329", moduleId: "64118", tagId: "62453", documentId: "93532", dueDate: "84524" }
]


app.get("/bugs/fetchBugs/", (req, res) => {

    res.send(bugs);
});

app.get("/bugs/fetchBugs/:id", (req, res) => {

    const bug = bugs.find(item => item.id === parseInt(req.params.id))

    if (!bug) res.status(404).json("Thre is no bugs to display!");

    res.send(bug);
});


app.post("/bugs/saveBugs", (req, res) => {

    const { error } = validateBugs(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)


    const bug = {
        id: bugs.length + 1,
        title: req.body.title,
        description:req.body.description
    };

    bugs.push(bug);
    res.send(bug)
});

app.put("/bugs/updateBugs/:id", (req, res) => {

    const bug = bugs.find(item => item.id === parseInt(req.params.id))

    if (!bug) res.status(404).json("Bug with this id is not found");


    const { error } = validateBugs(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)

    bug.title = req.body.title;
    bug.description=req.body.description;    
    res.send(bug);

});


app.delete("/bugs/deleteBugs/:id", (req, res) => {

    const bug = bugs.find(item => item.id === parseInt(req.params.id))

    if (!bug) res.status(404).json("Something went wrong..");

    const index = bugs.indexOf(bug)

    bugs.splice(index, 1)

    res.send(bugs)

});

function validateBugs(bug) {

    const bugSchema = {
        title: Joi.string().min(5).required(),
        description:Joi.string().min(5).required()
    };

    return Joi.validate(bug, bugSchema);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server is running on  port ${port}`));
